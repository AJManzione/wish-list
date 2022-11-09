const router = require("express").Router();
const bcrypt = require("bcrypt");
const { User } = require("../../models");

router.post("/signup", async (req, res) => {
  console.log("test");

  try {
    /* encrypt the password, and store user data to the db */
    const passwordHash = await bcrypt.hash(req.body.password, 10);
    const userData = await User.create({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      username: req.body.username,
      password: passwordHash,
    });

    if (userData) {
      /* save to session store - new user id and logged in status */
      req.session.save(() => {
        req.session.userId = userData.id;
        req.session.username = userData.username;
        req.session.loggedIn = true;

        /* Send response back to client */
        res
          .status(200)
          .json({ success: true, message: "User created successfully" });
      });
    } else {
      res.status(400).json("User not created");
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
