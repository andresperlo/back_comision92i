const { Schema, model } = require("mongoose");

const FavSchema = new Schema({
  idUser: {
    type: String,
  },
  products: [],
});

const FavsModel = model("favs", FavSchema);
module.exports = FavsModel;
