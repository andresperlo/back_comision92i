const mongoose = require("mongoose");

try {
  mongoose
    .connect(process.env.MONGO_CONNECT)
    .then(() => console.log("DB Connect"));
} catch (error) {
  console.log(error);
}
