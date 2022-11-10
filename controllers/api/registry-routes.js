const { Registry, User } = require("../../models");
const { update } = require("../../models/Category");

const router = require("express").Router();

// we need a place to add items to a registry, where products can be added but the registry wont be created until a button on this page is pressed, something like "save changes" or "save registry" then that button will link to a post route and create that registry and then redirect the user to registry/:id - Anthony

// not working currently, trying to render the dashboard handlebars

router.post("/", async (req, res) => {
  console.log("Request to create a new registry received");
  try {
    /* User exists, create the registry */

    req.body.date = new Date(req.body.date);

    console.log("Creating registry " + req.body.name);
    const registryData = await Registry.create({
      ...req.body,
      user_id: req.session.userId,
    });
    if (registryData) {
      res.status(200).json(registryData);
    } else {
      res.status(404).json({ message: "Registry not created" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.put("/:id", (req, res) => {});

router.delete("/:id", (req, res) => {});

module.exports = router;
