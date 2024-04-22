const express = require("express");
const {
  addProdCart,
  removeProdCart,
} = require("../controllers/carts.controllers");
const auth = require("../middlewares/auth");
const { check } = require("express-validator");
const router = express.Router();

router.post(
  "/:idProd",
  auth("user"),
  [check("id", "Formato ID Incorrecto").isMongoId()],
  addProdCart
);
router.delete(
  "/:idProd",
  auth("user"),
  [check("id", "Formato ID Incorrecto").isMongoId()],
  removeProdCart
);

module.exports = router;
