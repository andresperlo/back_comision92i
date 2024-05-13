const express = require("express");
const {
  registerUser,
  loginUser,
  recoveryPass,
  changePass,
  getAllUsers,
  updateUser,
  deleteUser,
} = require("../controllers/users.controllers");
const { check } = require("express-validator");
const auth = require("../middlewares/auth");
const router = express.Router();
/* body - params - query -> req.- check */

router.get("/", getAllUsers);
router.put("/:idUser", updateUser);
router.post(
  "/register",
  [
    check("nombreUsuario", "Campo Vacio").notEmpty(),
    check("contrasenia", "Campo Vacio").notEmpty(),
    check(
      "contrasenia",
      "ERR: Minimo 8 caracteres y maximo 30 caracteres"
    ).isLength({ min: 8, max: 30 }),
  ],
  registerUser
);
router.post(
  "/login",
  /*   [
    check("nombreUsuario", "Campo Vacio").notEmpty(),
    check("contrasenia", "Campo Vacio").notEmpty(),
    check(
      "contrasenia",
      "ERR: Minimo 8 caracteres y maximo 30 caracteres"
    ).isLength({ min: 8, max: 30 }),
  ], */
  loginUser
);

router.post("/recoveryPass", recoveryPass);
router.post("/changePass", changePass);

router.delete("/:idUser", deleteUser);

module.exports = router;
