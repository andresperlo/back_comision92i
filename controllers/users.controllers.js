const UserModel = require("../model/userSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
  try {
    const { nombreUsuario, contrasenia } = req.body;

    const userExist = await UserModel.findOne({ nombreUsuario });

    if (userExist) {
      return res.status(422).json({ msg: "Usuario y/o Incorrecto. USER" });
    }

    if (!nombreUsuario) {
      return res.status(400).json({ msg: "Campo NOMBRE Vacio" });
    } else if (!contrasenia) {
      return res.status(400).json({ msg: "Campo CONTRASEÑA Vacio" });
    }

    const newUser = new UserModel(req.body);

    let salt = bcrypt.genSaltSync(10);
    newUser.contrasenia = bcrypt.hashSync(req.body.contrasenia, salt);

    await newUser.save();

    res.status(201).json({ msg: "Usuario creado con exito", newUser });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Error: Server", error });
  }
};

const loginUser = async (req, res) => {
  try {
    const { nombreUsuario, contrasenia } = req.body;

    const userExist = await UserModel.findOne({ nombreUsuario });
    if (!userExist) {
      return res.status(422).json({ msg: "Usuario y/o Incorrecto. USER" });
    }

    const passCheck = bcrypt.compare(contrasenia, userExist.contrasenia);

    if (passCheck) {
      const payload = {
        user: {
          idUser: userExist._id,
          nombreUsuario: userExist.nombreUsuario,
          role: userExist.role,
        },
      };

      const token = jwt.sign(payload, "comision92i");

      res.status(200).json({ msg: "Usuario Logueado", token });
    } else {
      res.status("no logeado");
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Error: Server", error });
  }
};

module.exports = {
  registerUser,
  loginUser,
};
