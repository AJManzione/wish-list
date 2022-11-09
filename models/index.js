const Category = require('./Category');
const Product = require('./Product');
const Registry = require('./Registry');
const User = require('./User');

User.hasMany(Registry, {
    foreignKey: 'user_id',
    onDelete: "cascade"
});

Registry.belongsTo(User, {
    foreignKey: 'user_id',
});

Category.hasMany(Product, {
    foreignKey: 'category_id',
});

Product.belongsTo(Category, {
    foreignKey: 'category_id',
});

Product.belongsTo(Registry, {
    foreignKey: 'registry_id',
});

Registry.hasMany(Product, {
    foreignKey: 'registry_id',
});

module.exports = { User, Registry, Product, Category };