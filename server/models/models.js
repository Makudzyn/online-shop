// Файл с моделями (таблицами) базы данных, полями, типами полей, связями моделей
const sequelize = require("../db");
const {DataTypes} = require('sequelize'); // Класс с помощью которого задаются типы полей

const User = sequelize.define('user', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  role: {type: DataTypes.STRING, defaultValue: "USER"},
  email: {type: DataTypes.STRING, unique: true},
  password: {type: DataTypes.STRING},
})

const Cart = sequelize.define('cart', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})

const CartProduct = sequelize.define('cart_product', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  quantity: {type: DataTypes.INTEGER}
})

const Rating = sequelize.define('rating', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  rate: {type: DataTypes.INTEGER, allowNull: false},
})

const Product = sequelize.define('product', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  name: {type: DataTypes.STRING, unique: true, allowNull: false},
  price: {type: DataTypes.INTEGER, allowNull: false},
  rating: {type: DataTypes.INTEGER, defaultValue: 0},
  img: {type: DataTypes.STRING, allowNull: false},
})

const ProductInfo = sequelize.define('product_info', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  title: {type: DataTypes.STRING, unique: false, allowNull: false},
  description: {type: DataTypes.STRING, allowNull: false},
})

const Brand = sequelize.define('brand', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  name: {type: DataTypes.STRING, unique: true, allowNull: false},
})

const Type = sequelize.define('type', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  name: {type: DataTypes.STRING, unique: true, allowNull: false},
})

const TypeBrand = sequelize.define('type_brand', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})

// Устагавливаем связи между таблицами
User.hasOne(Cart);
Cart.belongsTo(User);

User.hasMany(Rating);
Rating.belongsTo(User);

Cart.hasMany(CartProduct);
CartProduct.belongsTo(Cart);

Type.hasMany(Product);
Product.belongsTo(Type);

Brand.hasMany(Product);
Product.belongsTo(Brand);

// Для связи многие-к-многим используем промежуточную таблицу
Type.belongsToMany(Brand, {through: TypeBrand});
Brand.belongsToMany(Type, {through: TypeBrand});

Product.hasMany(Rating);
Rating.belongsTo(Product);

Product.hasMany(ProductInfo, {as: "info"});
ProductInfo.belongsTo(Product);

Product.hasMany(CartProduct);
CartProduct.belongsTo(Product);

module.exports = {
  User, Cart, CartProduct,
  Product, ProductInfo, TypeBrand,
  Type, Brand, Rating
}



