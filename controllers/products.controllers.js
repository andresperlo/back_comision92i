const { validationResult } = require("express-validator");
const ProductModel = require("../model/product.schema");
const cloudinary = require("../middlewares/cloudinary");

const getAllProducts = async (req, res) => {
  try {
    console.log(req.query);
    const numeroPagina = req.query.numeroPagina || 0;
    const limite = req.query.limite || 5;

    const [products, count] = await Promise.all([
      ProductModel.find()
        .skip(numeroPagina * limite)
        .limit(limite),
      ProductModel.countDocuments(),
    ]);

    res
      .status(200)
      .json({ mensaje: "Todos los productos", products, count, limite });
  } catch (error) {
    res.status(500).json({ msg: "Error: Server", error });
  }
};

const getAllProductsEnabled = async (req, res) => {
  try {
    const allProducts = await ProductModel.find({ disabled: false });
    res.status(200).json({ mensaje: "Todos los productos", allProducts });
  } catch (error) {
    res.status(500).json({ msg: "Error: Server", error });
  }
};

const getAllProductsDisabled = async (req, res) => {
  try {
    const allProducts = await ProductModel.find({ disabled: true });
    res.status(200).json({ mensaje: "Todos los productos", allProducts });
  } catch (error) {
    res.status(500).json({ msg: "Error: Server", error });
  }
};

const getOneProduct = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json(errors.array());
    }

    const product = await ProductModel.findOne({
      _id: req.params.id,
    });

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

    const responseCloudinary = await cloudinary.uploader.upload(req.file.path);

    const newProduct = {
      nombre,
      precio,
      codigo,
      imagen: responseCloudinary.secure_url,
    };

    const newProd = new ProductModel(newProduct);
    await newProd.save();

    res.status(201).json({ msg: "Producto Creado", newProd });
  } catch (error) {
    res.status(500).json({ msg: "Error: Server", error });
  }
};

const updateProduct = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json(errors.array());
    }

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
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json(errors.array());
    }

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

const disabledProduct = async (req, res) => {
  try {
    const product = await ProductModel.findOne({ _id: req.params.idProd });
    console.log(product);
    if (!product.disabled) {
      product.disabled = true;
      await product.save();
      res.status(200).json({ msg: "Producto deshabilitado con exito" });
    } else {
      res.status(400).json({ msg: "Producto ya dashabilitado" });
    }
  } catch (error) {
    console.log(error);
  }
};

const enabledProduct = async (req, res) => {
  try {
    const product = await ProductModel.findOne({ _id: req.params.idProd });

    if (product.disabled) {
      product.disabled = false;
      await product.save();
      res.status(200).json({ msg: "Producto habilitado con exito" });
    } else {
      res.status(400).json({ msg: "Producto ya habilitado" });
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getAllProductsEnabled,
  getAllProductsDisabled,
  getAllProducts,
  getOneProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  disabledProduct,
  enabledProduct,
};
