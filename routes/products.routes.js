const express = require("express");
const {
  getAllProducts,
  getOneProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  disabledProduct,
  enabledProduct,
  getAllProductsEnabled,
  getAllProductsDisabled,
  mercadoPagoPay,
  addOrUpdateImgProduct,
} = require("../controllers/products.controllers");
const auth = require("../middlewares/auth");
const { check } = require("express-validator");
const multer = require("../middlewares/multer");
const route = express.Router();

/* Endpoint  - ruta + controlador = callback - */
/* GET - Obtener */
route.get("/", getAllProducts);
route.get("/enabled", getAllProductsEnabled);
route.get("/disabled", getAllProductsDisabled);
/* GET - Un Producto */
route.get(
  "/:id",
  [check("id", "Formato ID Incorrecto").isMongoId()],
  getOneProduct
);
/* POST - Crear */
route.post("/pay", mercadoPagoPay);
route.post("/", createProduct);
/* PUT - Actualizar */
route.put(
  "/:id",
  [check("id", "Formato ID Incorrecto").isMongoId()],
  updateProduct
);
route.put("/addImg/:idProduct", multer.single("imagen"), addOrUpdateImgProduct);
route.put("/disabled/:idProd", disabledProduct);
route.put("/enabled/:idProd", enabledProduct);
/* DELETE - Borrar */
route.delete(
  "/:id",
  [check("id", "Formato ID Incorrecto").isMongoId()],
  deleteProduct
);

module.exports = route;
