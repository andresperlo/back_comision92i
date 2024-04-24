const UserModel = require("../model/userSchema");
const CartModel = require("../model/CartSchema");
const FavsModel = require("../model/FavsSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const { userRegister, recoveryPassMsg } = require("../middlewares/message");

const registerUser = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json(errors.array());
    }

    const { nombreUsuario, emailUsuario, contrasenia } = req.body;

    const userExist = await UserModel.findOne({ nombreUsuario });

    if (userExist) {
      return res
        .status(422)
        .json({ msg: "Usuario y/o Contraseña Incorrecto. USER" });
    }

    if (!nombreUsuario) {
      return res.status(400).json({ msg: "Campo NOMBRE Vacio" });
    } else if (!contrasenia) {
      return res.status(400).json({ msg: "Campo CONTRASEÑA Vacio" });
    }

    const newUser = new UserModel(req.body);
    const newCart = new CartModel({ idUser: newUser._id });
    const newFav = new FavsModel({ idUser: newUser._id });

    newUser.idCart = newCart._id;
    newUser.idFav = newFav._id;

    let salt = bcrypt.genSaltSync(10);
    newUser.contrasenia = bcrypt.hashSync(req.body.contrasenia, salt);

    //const sendMail = await userRegister(emailUsuario);

    /* if (sendMail === 200) { */
    await newCart.save();
    await newFav.save();
    await newUser.save();

    res.status(201).json({ msg: "Usuario creado con exito", newUser });
    /*} else {
      res.status(400).json({ msg: "ERRMAIL. No se pudo crear el usuario" });
    } */
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Error: Server", error });
  }
};

const loginUser = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json(errors.array());
    }

    const { nombreUsuario, contrasenia } = req.body;
    console.log(nombreUsuario);
    const userExist = await UserModel.findOne({ nombreUsuario });
    console.log(userExist);
    if (!userExist) {
      return res
        .status(422)
        .json({ msg: "Usuario y/o Contraseña Incorrecto. USER" });
    }

    console.log(userExist);
    console.log(contrasenia);

    const passCheck = bcrypt.compareSync(contrasenia, userExist.contrasenia);

    if (passCheck) {
      const payload = {
        user: {
          idUser: userExist._id,
          nombreUsuario: userExist.nombreUsuario,
          role: userExist.role,
          idCart: userExist.idCart,
          idFav: userExist.idFav,
        },
      };

      const token = jwt.sign(payload, process.env.JWT_SECRET);

      res
        .status(200)
        .json({ msg: "Usuario Logueado", token, role: userExist.role });
    } else {
      res.status(400).json({ msg: "no logueado" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Error: Server", error });
  }
};

const recoveryPass = async (req, res) => {
  try {
    const user = await UserModel.findOne({
      emailUsuario: req.body.emailUsuario,
    });

    console.log(user);

    if (!user) {
      return res.status(404).json({ msg: "ERR: Usuario incorrecto" });
    }

    const payload = {
      user: {
        idUser: user._id,
        nombreUsuario: user.nombreUsuario,
        role: user.role,
      },
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET);
    const response = await recoveryPassMsg(token);

    if (response === 200) {
      res.status(200).json({ msg: "Tu email fue enviado con exito" });
    } else {
      res.status(422).json({ msg: "ERRMAIL. No se pudo enviar el mail" });
    }
  } catch (error) {
    console.log(error);
  }
};

const changePass = async (req, res) => {
  try {
    const user = await UserModel.findOne({ _id: req.idUser });

    let salt = bcrypt.genSaltSync(10);
    user.contrasenia = bcrypt.hashSync(req.body.contrasenia, salt);

    await user.save();
    res.status(200).json({ msg: "Contraseña cambiada con exito" });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  registerUser,
  loginUser,
  recoveryPass,
  changePass,
};
