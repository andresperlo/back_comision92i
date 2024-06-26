/* 
Verbos HTTP: 
C - Create 
R - Read
U - Update
D - Delete


POST - Crear o Actualizar - C - Create
GET - Obtener - R - Read - 
PUT - Actualzar - U - Update = PATCH
DELETE - Borrar - D - Delete

Request - req - Es la peticion que el frontend nos envia al backend
Respose - res - tipo JSON -  Es la repuesta que desde el backend se envia al frontend
*/
require("dotenv").config();
require("../DB/config");
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

class Server {
  constructor() {
    this.app = express();
    this.middleware();
    this.routes();
  }

  middleware() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(morgan("dev"));
    this.app.use(cors());
  }

  routes() {
    this.app.use("/api/products", require("../routes/products.routes"));
    this.app.use("/api/users", require("../routes/users.routes"));
    this.app.use("/api/carts", require("../routes/cart.routes"));
    this.app.use("/api/favs", require("../routes/favs.routes"));
  }

  listen() {
    this.app.listen(3001, () => {
      console.log("Servidor ejecutandose en el puerto: ", 3001);
    });
  }
}

module.exports = Server;
