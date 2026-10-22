require("dotenv").config();
const { createApp } = require("./app");
const app = createApp();
const port = Number(process.env.PORT || 4000);
// Render must listen on all interfaces, even if a copied .env uses localhost.
const host = process.env.RENDER === "true"
  ? "0.0.0.0"
  : process.env.HOST || (process.env.NODE_ENV === "production" ? "0.0.0.0" : "127.0.0.1");
const server = app.listen(port, host, () =>
  console.log(`Ankit Trading API: http://${host}:${server.address().port}`),
);
for (const signal of ["SIGINT", "SIGTERM"])
  process.on(signal, () =>
    server.close(async () => {
      await app.locals.close();
      process.exit(0);
    }),
  );
