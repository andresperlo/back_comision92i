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
  imagen: {
    type: String,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});

const ProductModel = mongoose.model("products", ProductSchema);
module.exports = ProductModel;
