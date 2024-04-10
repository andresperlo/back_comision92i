const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  nombre: {
    type: String,
  },
  precio: {
    type: Number,
    default: 0,
  },
  codigo: {
    type: String,
    required: true,
    unique: true,
  },
});

const ProductModel = mongoose.model("products", ProductSchema);
module.exports = ProductModel;
