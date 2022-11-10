const router = require("express").Router();
const bcrypt = require("bcryptjs");
const { User } = require("../../models");

router.post("/signup", async (req, res) => {
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
      res.status(401).json({ success: true, message: "Error creating user" });
    }
  } catch (err) {
    let error = "Error creating user";
    if (err.parent.errno) {
      switch (err.parent.errno) {
        case 1062:
          error = "That user already exists";
          break;

        default:
          console.log(err);
          break;
      }
    } else {
      console.log(err);
    }
    res.status(500).json({ success: false, message: error });
  }
});

router.get("/logout", (req, res) => {
  req.session.destroy(() => {
    res.status(200).json({ success: true });
  });
});

router.post("/login", async (req, res) => {
  try {
    const userData = await User.findOne({
      where: {
        username: req.body.username,
      },
    });

    if (!userData) {
      res.status(404).json({ success: false, message: "User not found" });
      return;
    }

    let passwordMatch = await bcrypt.compare(
      req.body.password,
      userData.password
    );

    if (!passwordMatch) {
      res.status(401).json({ success: false, message: "Incorrect password" });
      return;
    }

    req.session.save(() => {
      req.session.userId = userData.id;
      req.session.username = userData.username;
      req.session.loggedIn = true;

      /* Send response back to client */
      res
        .status(200)
        .json({ success: true, message: "User logged in successfully" });
    });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ success: false, message: "A server error occurred" });
  }
});

module.exports = router;
