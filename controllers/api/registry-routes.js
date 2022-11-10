const { Registry, User } = require("../../models");

const router = require("express").Router();

// we need a place to add items to a registry, where products can be added but the registry wont be created until a button on this page is pressed, something like "save changes" or "save registry" then that button will link to a post route and create that registry and then redirect the user to registry/:id - Anthony

// not working currently, trying to render the dashboard handlebars

router.post('/', async (req, res) => {
  console.log("Request to create a new registry received");
  try {
    /* assuming the request has the username of the creator */
    const userData = await User.findOne({
      where: {
        username: req.body.username
      }
    });

    if(!userData) {
      console.log(req.body.username + "not found");
      res.status(404).json("User not found");
      return;
    }

    /* User exists, create the registry */
    if(userData) {
      console.log("Creating registry " + req.body.name);
      const registryData = await Registry.create({ 
        name: req.body.name,
        date: Date.now(),
        user_id: userData.id // or req.session.user_id
      });
      if(registryData) {
        res.status(200).json("Registry created successfully");
      } else {
        res.status(404).json("Registry not created");
      }
    }   
  } catch(err) {
    res.status(500).json(err);
  }
});


module.exports = router;