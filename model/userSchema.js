const { Schema, model } = require("mongoose");

const UserSchema = new Schema({
  nombreUsuario: {
    type: String,
    required: true,
    unique: true,
  },
  emailUsuario: {
    type: String,
    required: true,
  },
  contrasenia: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: "user",
  },
  idCart: {
    type: String,
  },
  idFav: {
    type: String,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});

const UserModel = model("users", UserSchema);
module.exports = UserModel;
