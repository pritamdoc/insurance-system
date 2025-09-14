const express = require("express");
const multer = require("multer");
const { Worker } = require("worker_threads");
const path = require("path");

const router = express.Router();
const upload = multer({ dest: "uploads/" });
router.post("/", upload.single("file"), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }
    const filePath = path.resolve(req.file.path);
    const workerPath = path.resolve(__dirname, "../workers/uploadWorker.js");
    console.log("workerPath", workerPath);

    const worker = new Worker(workerPath, { workerData: { filePath } });

    worker.on("message", (msg) => res.json({ message: msg }));
    worker.on("error", (err) => {
      console.error("Worker error:", err);
      res.status(500).json({ error: err.message });
    });
    worker.on("exit", (code) => {
      if (code !== 0) {
        console.error(`Worker stopped with exit code ${code}`);
      }
    });
  } catch (error) {
    console.error("Route error:", error);
    res.status(500).json({ error: error.message });
  }
});
module.exports = router;
