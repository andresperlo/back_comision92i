const mongoose = require("mongoose");

try {
  mongoose
    .connect(
      "mongodb+srv://andresperlo5:oyaqdM4Ojlpfnz8N@cluster0.xo9fpqx.mongodb.net/"
    )
    .then(() => console.log("DB Connect"));
} catch (error) {
  console.log(error);
}
