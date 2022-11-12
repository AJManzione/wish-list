const { Product, Category, Registry } = require("../../models");

const router = require("express").Router();

router.post("/", async (req, res) => {
  if (!req.session.loggedIn) {
    return;
  }

  console.log("Received post req to create product in db");
  try {
    /* check if category exists */
    const categoryData = await Category.findByPk(req.body.category_id);
    if (!categoryData) {
      res.status(404).json("Category not found");
    }

    /* check if registry exists */
    const registryData = await Registry.findOne({
      where: {
        id: req.body.registry_id,
        user_id: req.session.userId,
      },
    });

    if (!registryData) {
      res.status(404).json({ message: "Registry not found" });
      return;
    }

    /* all ok, create the product */
    const productData = await Product.create({
      ...req.body,
      user_id: req.session.userId,
    });

    if (productData) {
      res.status(200).json(productData);
    } else {
      res.status(404).json("Product not created");
      return;
    }
  } catch (err) {
    let error = "Error creating product";
    if (err.parent) {
      if (err.parent.errno) {
        switch (err.parent.errno) {
          case 1366:
            error = "Please enter a valid price";
            break;

          default:
            console.log(err);
            break;
        }
      }
    } else {
      error = err.errors[0].message;
    }
    res.status(500).json({ success: false, message: error });
  }
});

router.put("/:id", async (req, res) => {
  if (!req.session.loggedIn) {
    return;
  }

  console.log("Received put req to update product in db");
  try {
    /* check if category exists */
    const categoryData = await Category.findByPk(req.body.category_id);
    if (!categoryData) {
      res.status(404).json("Category not found");
      return;
    }
    /* check if registry exists */
    const registryData = await Registry.findOne({
      where: {
        id: req.body.registry_id,
        user_id: req.session.userId,
      },
    });
    if (!registryData) {
      res.status(404).json("Registry not found");
      return;
    }
    /* all ok, update the product. */
    /* id in the req.body should be the same as req.params.id */
    const productData = await Product.update(
      { ...req.body },
      {
        where: {
          id: req.params.id,
        },
      }
    );

    if (productData) {
      res.status(200).json("Product updated successfully");
    } else {
      res.status(404).json("Product not updated");
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.delete("/:id", async (req, res) => {
  if (!req.session.loggedIn) {
    return;
  }

  console.log("received delete req to /api/product/:id" + req.params.id);
  try {
    const product = await Product.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.userId,
      },
    });
    if (product) {
      res.status(200).json({ message: "Product deleted successfully" });
    } else {
      res.status(404).json({ message: "Product not found" });
      return;
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ ...err, message: "A server error occurred" });
  }
});

module.exports = router;
