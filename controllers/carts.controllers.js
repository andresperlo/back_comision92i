const { validationResult } = require("express-validator");
const CartModel = require("../model/CartSchema");
const ProductModel = require("../model/product.schema");

const getCart = async (req, res) => {
  try {
    const cart = await CartModel.findOne({ _id: req.idCart });
    res.status(200).json({ msg: "Favoritos", cart: cart.products });
  } catch (error) {
    console.log(error);
  }
};

const addProdCart = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json(errors.array());
    }

    const cart = await CartModel.findOne({ _id: req.idCart });
    const product = await ProductModel.findOne({ _id: req.params.idProd });

    cart.products.push(product);

    await cart.save();

    res.status(200).json({ msg: "Producto cargado correctamente" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Server ERROR ", error });
  }
};

const removeProdCart = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json(errors.array());
    }

    const cart = await CartModel.findOne({ _id: req.idCart });
    const products = cart.products.filter(
      (product) => product._id.toString() !== req.params.idProd
    );

    cart.products = products;

    await cart.save();

    res.status(200).json({ msg: "Producto eliminado correctamente" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Server ERROR ", error });
  }
};

module.exports = {
  addProdCart,
  removeProdCart,
  getCart,
};
