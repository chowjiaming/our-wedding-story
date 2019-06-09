const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator/check");
const auth = require("../../middleware/auth");

const Story = require("../../models/Story");
const Profile = require("../../models/Profile");
const User = require("../../models/User");

// @route    STORY api/stories
// @desc     Create a story
// @access   Private
router.post(
  "/",
  [
    auth,
    [
      check("text", "Text is required")
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });
    try {
      const user = await User.findById(req.user.id).select("-password");
      const newStory = new Story({
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id
      });
      const story = await newStory.save();
      res.json(story);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route    GET api/stories
// @desc     Get all stories
// @access   Private
router.get("/", auth, async (req, res) => {
  try {
    const stories = await Story.find().sort({ date: -1 });
    res.json(stories);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route    GET api/stories/current
// @desc     Get all current user's stories
// @access   Private
router.get("/current", auth, async (req, res) => {
  try {
    const stories = await Story.find({ user: req.user.id }).sort({ date: -1 });
    res.json(stories);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route    GET api/stories/:id
// @desc     Get story by ID
// @access   Private
router.get("/:id", auth, async (req, res) => {
  try {
    const story = await Story.findById(req.params.id);
    if (!story) return res.status(404).json({ msg: "Story not found" });
    res.json(story);
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Story not found" });
    }
    res.status(500).send("Server Error");
  }
});

// @route    DELETE api/stories/:id
// @desc     Delete a story
// @access   Private
router.delete("/:id", auth, async (req, res) => {
  try {
    const story = await Story.findById(req.params.id);
    if (!story) return res.status(404).json({ msg: "Story not found" });
    // Check user
    if (story.user.toString() !== req.user.id)
      return res.status(401).json({ msg: "User not authorized" });
    await story.remove();
    res.json({ msg: "Story removed" });
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Story not found" });
    }
    res.status(500).send("Server Error");
  }
});

// @route    PUT api/stories/like/:id
// @desc     Like a story
// @access   Private
router.put("/like/:id", auth, async (req, res) => {
  try {
    const story = await Story.findById(req.params.id);

    // Check if the story has already been liked
    if (
      story.likes.filter(like => like.user.toString() === req.user.id).length > 0
    )
      return res.status(400).json({ msg: "Story already liked" });
    story.likes.unshift({ user: req.user.id });
    await story.save();
    res.json(story.likes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route    PUT api/stories/unlike/:id
// @desc     Like a story
// @access   Private
router.put("/unlike/:id", auth, async (req, res) => {
  try {
    const story = await Story.findById(req.params.id);
    // Check if the story has already been liked
    if (
      story.likes.filter(like => like.user.toString() === req.user.id).length ===
      0
    )
      return res.status(400).json({ msg: "Story has not yet been liked" });
    // Get remove index
    const removeIndex = story.likes
      .map(like => like.user.toString())
      .indexOf(req.user.id);
    story.likes.splice(removeIndex, 1);
    await story.save();
    res.json(story.likes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route    STORY api/stories/comment/:id
// @desc     Comment on a story
// @access   Private
router.post(
  "/comment/:id",
  [
    auth,
    [
      check("text", "Text is required")
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });
    try {
      const user = await User.findById(req.user.id).select("-password");
      const story = await Story.findById(req.params.id);
      const newComment = {
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id
      };
      story.comments.unshift(newComment);
      await story.save();
      res.json(story.comments);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route    DELETE api/stories/comment/:id/:comment_id
// @desc     Delete comment
// @access   Private
router.delete("/comment/:id/:comment_id", auth, async (req, res) => {
  try {
    const story = await Story.findById(req.params.id);
    // Pull out comment
    const comment = story.comments.find(
      comment => comment.id === req.params.comment_id
    );
    // Make sure comment exists
    if (!comment)
      return res.status(404).json({ msg: "Comment does not exist" });
    // Check user
    if (comment.user.toString() !== req.user.id)
      return res.status(401).json({ msg: "User not authorized" });
    // Get remove index
    const removeIndex = story.comments
      .map(comment => comment.id)
      .indexOf(req.params.comment_id);
    story.comments.splice(removeIndex, 1);
    await story.save();
    res.json(story.comments);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
