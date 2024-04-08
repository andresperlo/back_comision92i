const express = require("express");
const {
  getAllProducts,
  getOneProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/products.controllers");
const route = express.Router();

/* Endpoint  - ruta + controlador = callback - */
/* GET - Obtener */
route.get("/", getAllProducts);
/* GET - Un Producto */
route.get("/:id", getOneProduct);
/* POST - Crear */
route.post("/", createProduct);
/* PUT - Actualizar */
route.put("/:id", updateProduct);
/* DELETE - Borrar */
route.delete("/:id", deleteProduct);

module.exports = route;
