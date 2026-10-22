require("dotenv").config();
const { createApp } = require("./app");
const app = createApp();
const port = Number(process.env.PORT || 4000);
const server = app.listen(port, process.env.HOST || "127.0.0.1", () =>
  console.log(
    `Ankit Trading API: http://${process.env.HOST || "127.0.0.1"}:${port}`,
  ),
);
for (const signal of ["SIGINT", "SIGTERM"])
  process.on(signal, () =>
    server.close(async () => {
      await app.locals.close();
      process.exit(0);
    }),
  );
