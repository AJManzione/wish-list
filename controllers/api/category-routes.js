const { Category } = require("../../models");

const router = require("express").Router();

router.get('/', async (req, res) => {
  try {
    const categoryData = await Category.findAll();
    if(categoryData) {
      res.status(200).json(categoryData);
    } else {
      res.status(404).json("Not able to read categories");
    }
  } catch(err) {
    res.status(500).json(err);
  }
});


module.exports = router;