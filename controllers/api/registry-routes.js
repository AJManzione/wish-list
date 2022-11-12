const { Registry, User } = require("../../models");
const { update } = require("../../models/Category");

const router = require("express").Router();

// we need a place to add items to a registry, where products can be added but the registry wont be created until a button on this page is pressed, something like "save changes" or "save registry" then that button will link to a post route and create that registry and then redirect the user to registry/:id - Anthony

// not working currently, trying to render the dashboard handlebars

router.post("/", async (req, res) => {
  try {
    /* User exists, create the registry */

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

router.put("/:id", (req, res) => {
  if (!req.session.loggedIn) {
    return;
  }

  Registry.update(req.body, {
    where: {
      user_id: req.session.userId,
      id: req.params.id,
    },
  })
    .then((dbRegistryData) => {
      if (!dbRegistryData) {
        res.status(404).json({ message: "No registry found with this id" });
        return;
      }
      res.json(dbRegistryData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.delete("/:id", (req, res) => {
  if (!req.session.loggedIn) {
    return;
  }

  Registry.destroy({
    where: {
      user_id: req.session.userId,
      id: req.params.id,
    },
  })
    .then((dbRegistryData) => {
      if (!dbRegistryData) {
        res.status(404).json({ message: "No registry found with this id" });
        return;
      }
      res.json(dbRegistryData);
      console.log("registry deleted");
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
