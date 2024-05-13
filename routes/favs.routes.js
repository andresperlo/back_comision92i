const express = require("express");
const {
  addProdFav,
  removeProdFav,
  getFav,
} = require("../controllers/favs.controllars");
const auth = require("../middlewares/auth");
const { check } = require("express-validator");
const router = express.Router();

router.get("/", auth("user"), getFav);

router.post(
  "/:idProd",
  auth("user"),
  /*   [check("id", "Formato ID Incorrecto").isMongoId()], */
  addProdFav
);
router.delete(
  "/:idProd",
  auth("user"),
  /*   [check("id", "Formato ID Incorrecto").isMongoId()], */
  removeProdFav
);

module.exports = router;
