const { Router } = require("express");
const router = Router();
const passport = require("passport");

const User = require("../models/User");
require("../lib/passport");

// Checks if user is logged and sends the info to the server
router.get("/user", (req, res) => {
  if (!req.user) {
    return res.send("null");
  } else {
    return res.json({
      _id: req.user._id,
      username: req.user.username
    });
  }
});

router.post("/signup", async (req, res) => {
  try {
    if (req.user) {
      throw Error("Unauthorized.");
    } else {
      const { username, password, email } = req.body;
      // We verify if a user with that username doesn't exists
      const users = await User.findOne({ username: username });
      if (users) {
        return res.json({ status: "Username already exists" });
      } else {
        const newUser = new User({ username, password, email });
        await newUser.save();
        return res.json({ response: "User added succesfully" });
      }
    }
  } catch (e) {
    res.status(403).send(e.message);
  }
});

router.post(
  "/login",
  (req, res, next) => {
    if (req.user) {
      res.status(403).json({ user: "Unauthorized" });
    } else {
      next();
    }
  },
  passport.authenticate("localLogin", { failWithError: true }),
  (req, res) => {
    return res.json({
      _id: req.user._id,
      username: req.user.username
    });
  },
  (err, req, res, next) => {
    res.status(403).send(err);
  }
);

router.post("/logout", (req, res) => {
  req.logOut();
  return res.status(200).json({ response: "Logout confirmed" });
});

module.exports = router;
