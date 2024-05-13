const express = require("express");
const {
  addProdCart,
  removeProdCart,
  getCart,
} = require("../controllers/carts.controllers");
const auth = require("../middlewares/auth");
const { check } = require("express-validator");
const router = express.Router();

router.get("/", auth("user"), getCart);

router.post(
  "/:idProd",
  auth("user"),
  /*   [check("id", "Formato ID Incorrecto").isMongoId()], */
  addProdCart
);
router.delete(
  "/:idProd",
  auth("user"),
  [check("id", "Formato ID Incorrecto").isMongoId()],
  removeProdCart
);

module.exports = router;
