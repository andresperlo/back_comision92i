const { Schema, model } = require("mongoose");

const CartSchema = new Schema({
  idUser: {
    type: String,
  },
  products: [],
});

const CartModel = model("cart", CartSchema);
module.exports = CartModel;
