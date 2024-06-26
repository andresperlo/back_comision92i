const { validationResult } = require("express-validator");
const FavsModel = require("../model/FavsSchema");
const ProductModel = require("../model/product.schema");

const getFav = async (req, res) => {
  try {
    const fav = await FavsModel.findOne({ _id: req.idFav });
    res.status(200).json({ msg: "Favoritos", favs: fav.products });
  } catch (error) {
    console.log(error);
  }
};

const addProdFav = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json(errors.array());
    }

    const fav = await FavsModel.findOne({ _id: req.idFav });
    const product = await ProductModel.findOne({ _id: req.params.idProd });

    fav.products.push(product);

    await fav.save();

    res.status(200).json({ msg: "Producto cargado correctamente" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Server ERROR ", error });
  }
};

const removeProdFav = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json(errors.array());
    }

    const fav = await FavsModel.findOne({ _id: req.idFav });
    const products = fav.products.filter(
      (product) => product._id.toString() !== req.params.idProd
    );

    fav.products = products;

    await fav.save();

    res.status(200).json({ msg: "Producto eliminado correctamente" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Server ERROR ", error });
  }
};

module.exports = {
  addProdFav,
  removeProdFav,
  getFav,
};
