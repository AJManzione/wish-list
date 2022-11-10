const router = require("express").Router();
const userRoutes = require("./user-routes.js");
const productRoutes = require("./product-routes.js");
const categoryRoutes = require("./category-routes.js");
const registryRoutes = require("./registry-routes.js")

router.use("/user", userRoutes);
router.use("/product", productRoutes);
router.use("/category", categoryRoutes);
router.use("/registry", registryRoutes);

module.exports = router;
