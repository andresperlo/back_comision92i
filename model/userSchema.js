const { Schema, model } = require("mongoose");

const UserSchema = new Schema({
  nombreUsuario: {
    type: String,
    required: true,
    unique: true,
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
});

const UserModel = model("users", UserSchema);
module.exports = UserModel;
