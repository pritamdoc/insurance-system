const express = require("express");
const Policy = require("../models/Policy");
const User = require("../models/User");
const Carrier = require("../models/Carrier");
const Category = require("../models/Category");
const router = express.Router();

router.get("/search/:username", async (req, res) => {
  console.log("userPolicy");
  try {
    const username = req.params.username;

    const user = await User.findOne({
      firstname: { $regex: username, $options: "i" },
    });

    console.log("user", user);
    if (!user) return res.status(404).json({ message: "User not found" });

    const policies = await Policy.find({ userId: user._id }).populate(
      "carrierId categoryId"
    );
    console.log("policies", policies);
    res.json({ user, policies });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/userPolicy", async (req, res) => {
  try {
    const data = await Policy.aggregate([
      {
        $lookup: {
          from: "users",
          localField: "userId",
          foreignField: "_id",
          as: "user",
        },
      },
      { $unwind: "$user" },
      {
        $group: {
          _id: "$user.firstname",
          totalPolicies: { $sum: 1 },
          policies: { $push: "$policyNumber" },
        },
      },
    ]);

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
