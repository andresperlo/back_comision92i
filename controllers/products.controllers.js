const ProductModel = require("../model/product.schema");

let baseDeDatosDeProductos = [
  {
    id: 1,
    nombre: "Celular",
    precio: "1500",
  },
  {
    id: 2,
    nombre: "Celular2",
    precio: "1600",
  },
];

const getAllProducts = (req, res) => {
  try {
    res
      .status(200)
      .json({ mensaje: "Todos los productos", baseDeDatosDeProductos });
  } catch (error) {
    res.status(500).json({ msg: "Error: Server", error });
  }
};

const getOneProduct = (req, res) => {
  try {
    /* req - es un objeto - body - params - query*/
    console.log(req.params);
    const product = baseDeDatosDeProductos.find(
      (product) => product.id === Number(req.params.id)
    );

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
    const newProduct = new ProductModel(req.body);
    await newProduct.save();

    res.status(201).json({ msg: "Producto Creado", newProduct });
    /*   const newProd = req.body;
    const productExist = baseDeDatosDeProductos.find(
      (product) => product.nombre === req.body.nombre
    );

    if (!productExist) {
      baseDeDatosDeProductos.push(newProd);
      console.log(baseDeDatosDeProductos);
      res
        .status(201)
        .json({ mensaje: "Producto creado correctamente", newProd });
    } else {
      res.status(400).json({ msg: "Producto ya existe en la base de datos" });
    } */
  } catch (error) {
    res.status(500).json({ msg: "Error: Server", error });
  }
};

const updateProduct = (req, res) => {
  try {
    const positionProduct = baseDeDatosDeProductos.findIndex(
      (product) => product.id === Number(req.params.id)
    );

    if (positionProduct < 0) {
      return res.status(404).json({ msg: "Producto no encontrado" });
    }

    baseDeDatosDeProductos[positionProduct] = req.body;

    res.json({
      mensaje: "Producto Actualizado",
      updateProd: baseDeDatosDeProductos[positionProduct],
    });
  } catch (error) {
    res.status(500).json({ msg: "Error: Server", error });
  }
};

const deleteProduct = (req, res) => {
  try {
    const productosNoBorrados = baseDeDatosDeProductos.filter(
      (product) => product.id !== Number(req.params.id)
    );

    const productoABorrar = baseDeDatosDeProductos.filter(
      (product) => product.id === Number(req.params.id)
    );

    if (!productoABorrar.length) {
      return res.status(404).json({ msg: "ID incorrecto. Producto no existe" });
    }

    baseDeDatosDeProductos = productosNoBorrados;

    res.status(200).json({
      mensaje: "Producto Eliminado correctamente",
      baseDeDatosDeProductos,
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
