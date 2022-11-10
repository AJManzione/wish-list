const { Registry, User } = require("../../models");

const router = require("express").Router();

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