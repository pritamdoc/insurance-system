const express = require("express");
const schedule = require("node-schedule");
const mongoose = require("mongoose");

const router = express.Router();

const MessageSchema = new mongoose.Schema({
  message: String,
  scheduleTime: Date,
});
const Message = mongoose.model("Message", MessageSchema);

router.post("/", async (req, res) => {
  const { message, day, time } = req.body;
  const scheduleTime = new Date(`${day} ${time}`);

  schedule.scheduleJob(scheduleTime, async () => {
    await Message.create({ message, scheduleTime });
    console.log("Message inserted:", message);
  });

  res.json({ success: true, scheduleTime });
});

module.exports = router;
