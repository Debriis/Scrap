const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const { rateLimit } = require("express-rate-limit");
const { z } = require("zod");
const Database = require("better-sqlite3");
const nodemailer = require("nodemailer");
const fs = require("node:fs");
const path = require("node:path");

const inquirySchema = z
  .object({
    name: z.string().trim().min(2).max(150),
    phone: z
      .string()
      .max(20)
      .transform((s) => s.replace(/[\s()-]/g, ""))
      .pipe(
        z
          .string()
          .regex(
            /^(?:\+91)?[6-9]\d{9}$/,
            "Enter a valid Indian mobile number.",
          ),
      ),
    email: z
      .union([z.email().max(200), z.literal("")])
      .optional()
      .default(""),
    material: z.enum([
      "iron-scrap",
      "plastic-scrap",
      "waste-paper",
      "cardboard",
      "glass-bottles",
      "other",
    ]),
    quantity: z.string().trim().max(100).optional().default(""),
    location: z.string().trim().min(2).max(200),
    message: z.string().trim().min(10).max(3000),
    website: z.string().max(200).optional().default(""),
  })
  .strict();

function createApp(options = {}) {
  const app = express();
  app.disable("x-powered-by");
  // Configure only a trusted proxy hop count when deploying behind a known proxy.
  if (process.env.TRUST_PROXY_HOPS)
    app.set("trust proxy", Number(process.env.TRUST_PROXY_HOPS));
  const allowed = (
    options.origins ||
    process.env.CORS_ORIGINS ||
    "http://127.0.0.1:5173,http://localhost:5173"
  )
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  app.use(helmet());
  app.use(
    cors({
      origin(origin, cb) {
        cb(null, !origin || allowed.includes(origin));
      },
      methods: ["GET", "POST"],
      allowedHeaders: ["Content-Type"],
      maxAge: 600,
    }),
  );
  app.use((req, res, next) => {
    const origin = req.get("origin");
    if (origin && !allowed.includes(origin))
      return res.status(403).json({ message: "This origin is not allowed." });
    next();
  });
  app.use(express.json({ limit: "16kb", strict: true }));
  const dbPath =
    options.dbPath ||
    process.env.DB_PATH ||
    path.join(__dirname, "../data/inquiries.sqlite");
  if (dbPath !== ":memory:")
    fs.mkdirSync(path.dirname(dbPath), { recursive: true });
  const db = new Database(dbPath);
  db.pragma("journal_mode = WAL");
  db.exec(`CREATE TABLE IF NOT EXISTS inquiries (
  id INTEGER PRIMARY KEY AUTOINCREMENT, created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ','now')),
  name TEXT NOT NULL, phone TEXT NOT NULL, email TEXT NOT NULL, material TEXT NOT NULL,
  quantity TEXT NOT NULL, location TEXT NOT NULL, message TEXT NOT NULL,
  notification_status TEXT NOT NULL DEFAULT 'not_configured'
 )`);
  const save = db.prepare(
    "INSERT INTO inquiries (name,phone,email,material,quantity,location,message,notification_status) VALUES (@name,@phone,@email,@material,@quantity,@location,@message,@notification_status)",
  );
  const smtp =
    options.mailer ||
    (process.env.SMTP_HOST &&
    process.env.SMTP_FROM &&
    process.env.NOTIFICATION_EMAIL
      ? nodemailer.createTransport({
          host: process.env.SMTP_HOST,
          port: Number(process.env.SMTP_PORT || 587),
          secure: process.env.SMTP_SECURE === "true",
          ...(process.env.SMTP_USER
            ? {
                auth: {
                  user: process.env.SMTP_USER,
                  pass: process.env.SMTP_PASS,
                },
              }
            : {}),
          connectionTimeout: 5000,
          socketTimeout: 7000,
          greetingTimeout: 5000,
        })
      : null);
  const pending = new Set();
  function notify(id, data) {
    if (!smtp) return;
    const job = Promise.resolve()
      .then(() =>
        smtp.sendMail({
          from: process.env.SMTP_FROM,
          to: process.env.NOTIFICATION_EMAIL,
          ...(data.email ? { replyTo: data.email } : {}),
          subject: `New material inquiry #${id}`,
          text: Object.entries(data)
            .filter(([key]) => key !== "website")
            .map(([key, value]) => `${key}: ${value}`)
            .join("\n"),
        }),
      )
      .then(() =>
        db
          .prepare("UPDATE inquiries SET notification_status = ? WHERE id = ?")
          .run("sent", id),
      )
      .catch(() => {
        db.prepare(
          "UPDATE inquiries SET notification_status = ? WHERE id = ?",
        ).run("failed", id);
        console.error(
          `SMTP notification failed for inquiry ${id}; inquiry remains stored.`,
        );
      })
      .finally(() => pending.delete(job));
    pending.add(job);
  }
  app.get("/api/health", (req, res) => {
    try {
      db.prepare("SELECT 1").get();
      res.json({ status: "ok" });
    } catch {
      res.status(503).json({ status: "unavailable" });
    }
  });
  app.post(
    "/api/inquiries",
    rateLimit({
      windowMs: 15 * 60 * 1000,
      limit: options.rateLimit || 5,
      standardHeaders: "draft-8",
      legacyHeaders: false,
      message: {
        message:
          "Too many inquiries. Please try again in 15 minutes, or call us.",
      },
    }),
    (req, res) => {
      if (!req.is("application/json"))
        return res
          .status(415)
          .json({ message: "Please send application/json." });
      const result = inquirySchema.safeParse(req.body);
      if (!result.success) {
        const errors = {};
        for (const issue of result.error.issues) {
          const key = issue.path[0];
          if (key && !errors[key]) errors[key] = issue.message;
        }
        return res
          .status(422)
          .json({ message: "Please check the highlighted details.", errors });
      }
      if (result.data.website)
        return res
          .status(400)
          .json({
            message:
              "Unable to accept this submission. Please contact us directly.",
          });
      try {
        const data = result.data;
        const row = save.run({
          ...data,
          notification_status: smtp ? "pending" : "not_configured",
        });
        notify(Number(row.lastInsertRowid), data);
        return res
          .status(201)
          .json({
            message:
              "Your inquiry has been saved. Please call or WhatsApp us if you need to discuss it directly.",
            reference: Number(row.lastInsertRowid),
          });
      } catch (error) {
        console.error("Inquiry storage failed:", error.code || "unknown");
        return res
          .status(503)
          .json({
            message:
              "Your inquiry could not be saved. Please try again or contact us directly.",
          });
      }
    },
  );
  app.use((req, res) =>
    res.status(404).json({ message: "Endpoint not found." }),
  );
  app.use((error, req, res, next) => {
    if (res.headersSent) return next(error);
    const status =
      error.type === "entity.too.large"
        ? 413
        : error.type === "entity.parse.failed"
          ? 400
          : 500;
    res
      .status(status)
      .json({
        message:
          status === 413
            ? "Request is too large."
            : status === 400
              ? "Invalid JSON request."
              : "Something went wrong. Please contact us directly.",
      });
  });
  app.locals.db = db;
  app.locals.close = async () => {
    await Promise.allSettled([...pending]);
    db.close();
  };
  return app;
}
module.exports = { createApp, inquirySchema };
