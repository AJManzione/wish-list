const router = require("express").Router();

router.get("/", async (req, res) => {
  /* get list of registries */
  try {
  const registryData = await Registry.findAll( {
    include:
      {model: User,
      attributes: [
        'username'
      ]}, 
  });

  const registries = registryData.map((registry) => registry.get({plain: true}));
  if (registries) {
    /* render homepage with list */
    res.render('homepage', {registries});
  } else {
    res.status(404).json({success: false, message: "No registries found"});
  }
  } catch (err) {
    res.status(500).json(err);
  }

});

router.get("/dashboard", async (req, res) => {
  if(!req.session.loggedIn) {
    res.render('login');
  } else {

  const registryData = await Registry.findAll({
    where: {
      id: req.session.user_id,
    }
  });

  if(registryData) {
    const registries = registryData.get({plain: true});
    res.render('dashboard', { registries: registries, loggedIn: req.session.loggedIn });
  } else {
    /* if no registries, show "No registries for this user" */
    res.render('dashboard',{posts: null, loggedIn: req.session.loggedIn})
  }
  }
});

router.get('/login', (req, res) => {
  if(req.session.loggedIn) {
    res.redirect('dashboard');
    return;
  }
  res.render('login');
});


module.exports = router;
