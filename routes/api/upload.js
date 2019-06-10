const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const request = require("request");

const User = require("../../models/User");

// Upload Endpoint
router.post("/", auth, async (req, res) => {
  if (req.files === null)
    return res.status(400).json({ msg: "No file uploaded" });
  const file = req.files.file;
  file.name = file.name.replace(/\s+/g, "");
  await file.mv(
    `${__dirname}/../../client/public/users/${req.user.id}/pictures/${file.name}`,
    err => {
      if (err) {
        console.error(err);
        return res.status(500).send(err);
      }
    }
  );
  let user = await User.findById(req.user.id);
  const userField = {
    avatar: `/users/${req.user.id}/pictures/${file.name}`
  };
  if (user) {
    // Update
    user = await User.findOneAndUpdate(
      { _id: req.user.id },
      { $set: userField },
      { new: true }
    );
    return res.json({
      fileName: file.name,
      filePath: `/users/${req.user.id}/pictures/${file.name}`
    });
  }
});

module.exports = router;
