const ProductModel = require("../model/product.schema");

const getAllProducts = async (req, res) => {
  try {
    const allProducts = await ProductModel.find();
    res.status(200).json({ mensaje: "Todos los productos", allProducts });
  } catch (error) {
    res.status(500).json({ msg: "Error: Server", error });
  }
};

const getOneProduct = async (req, res) => {
  try {
    const product = await ProductModel.findOne({ _id: req.params.id });

    if (product) {
      res.status(200).json({ mensaje: "Producto encontrado", product });
    } else {
      res.status(400).json({ mensaje: "ID Incorrecto. Producto no existe" });
    }
  } catch (error) {
    res.status(500).json({ msg: "Error: Server", error });
  }
};

const createProduct = async (req, res) => {
  try {
    const { nombre, precio, codigo } = req.body;

    if (!nombre && !precio && codigo) {
      return res.status(400).json({ msg: "El Formulario esta Vacio" });
    }

    if (!nombre) {
      return res.status(400).json({ msg: "El Campo NOMBRE esta Vacio" });
    } else if (!precio) {
      return res.status(400).json({ msg: "El Campo PRECIO esta Vacio" });
    } else if (!codigo) {
      return res.status(400).json({ msg: "El Campo CODIGO esta Vacio" });
    }

    const newProduct = new ProductModel(req.body);
    await newProduct.save();

    res.status(201).json({ msg: "Producto Creado", newProduct });
  } catch (error) {
    res.status(500).json({ msg: "Error: Server", error });
  }
};

const updateProduct = async (req, res) => {
  try {
    const updateProduct = await ProductModel.findByIdAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    );

    res.status(200).json({
      mensaje: "Producto Actualizado",
      updateProduct,
    });
  } catch (error) {
    res.status(500).json({ msg: "Error: Server", error });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const productExist = await ProductModel.findOne({ _id: req.params.id });

    if (!productExist) {
      return res.status(404).json({ msg: "Producto no encontrado" });
    }

    await ProductModel.findByIdAndDelete({ _id: req.params.id });

    res.status(200).json({
      mensaje: "Producto Eliminado correctamente",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Error: Server", error });
  }
};

module.exports = {
  getAllProducts,
  getOneProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};
