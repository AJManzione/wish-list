const sequelize = require('../config/connection');
const { Category } = require('../models');

const categorySeedData = require('./categorySeeds.json');

const seedWishList = async () => {
  await sequelize.sync({ force: true });

  const categoryData = await Category.bulkCreate(categorySeedData);
  if (categoryData) {
    console.log("Categories seeded" + categoryData);
  } else {
    console.log("Categories not seeded" + categoryData);
  }

  process.exit(0);

};

seedWishList();
