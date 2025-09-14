const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
// const os = require("os");
const uploadRoutes = require("./routes/upload");
const usersRoutes = require("./routes/user");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: "*" }));
connectDB();

// setInterval(() => {
//   const load = (os.loadavg()[0] / os.cpus().length) * 100;
//   if (load > 70) {
//     console.log("High CPU usage detected. Restarting server...");
//     process.exit(1);
//   }
// }, 5000);
app.use((req, res, next) => {
  console.log("Incoming:", req.method, req.url);
  next();
});

app.use("/api/upload", uploadRoutes);
app.use("/api/user", usersRoutes);

app.listen(3000, () => console.log("Server running on port 3000"));
