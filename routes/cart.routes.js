const express = require("express");
const {
  addProdCart,
  removeProdCart,
} = require("../controllers/carts.controllers");
const auth = require("../middlewares/auth");
const router = express.Router();

router.post("/:idProd", auth("user"), addProdCart);
router.delete("/:idProd", auth("user"), removeProdCart);

module.exports = router;
