const sequelize = require("../db");
const {DataTypes} = require('sequelize');

const User = sequelize.define('User', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  role: {type: DataTypes.STRING, defaultValue: "USER"},
  email: {type: DataTypes.STRING, unique: true},
  password: {type: DataTypes.STRING},
})

const Basket = sequelize.define('Basket', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})

const BasketProduct = sequelize.define('Basket_product', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})

const Rating = sequelize.define('Rating', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  rate: {type: DataTypes.INTEGER, allowNull: false},
})


const Product = sequelize.define('Product', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  name: {type: DataTypes.STRING, unique: true, allowNull: false},
  price: {type: DataTypes.INTEGER, allowNull: false},
  rating: {type: DataTypes.INTEGER, defaultValue: 0},
  img: {type: DataTypes.STRING, allowNull: false},
})

const ProductInfo = sequelize.define('Product_info', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  title: {type: DataTypes.STRING, unique: true, allowNull: false},
  description: {type: DataTypes.STRING, allowNull: false},
})

const Brand = sequelize.define('Brand', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  name: {type: DataTypes.STRING, unique: true, allowNull: false},
})

const Type = sequelize.define('Type', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  name: {type: DataTypes.STRING, unique: true, allowNull: false},
})

const TypeBrand = sequelize.define('Type_brand', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})


User.hasOne(Basket);
Basket.belongsTo(User);

User.hasMany(Rating);
Rating.belongsTo(User);

Basket.hasMany(BasketProduct);
BasketProduct.belongsTo(Basket);

Type.hasMany(Product);
Product.belongsTo(Type);

Brand.hasMany(Product);
Product.belongsTo(Brand);

Type.belongsToMany(Brand, {through: TypeBrand});
Brand.belongsToMany(Type, {through: TypeBrand});

Product.hasMany(Rating);
Rating.belongsTo(Product);

Product.hasMany(ProductInfo);
ProductInfo.belongsTo(Product);

Product.hasMany(BasketProduct);
BasketProduct.belongsTo(Product);

module.exports = {
  User, Basket, BasketProduct,
  Product, ProductInfo, TypeBrand,
  Type, Brand, Rating
}



