const transporter = require("./nodemailer");

const userRegister = async (userName) => {
  try {
    const info = await transporter.sendMail({
      from: '"Registro exitoso. Bienvenido 👻" <proferc23@gmail.com>', // sender address
      to: `${userName}`, // list of receivers
      subject: "Hello ✔", // Subject line
      html: "<b>Hello world?</b>", // html body
    });

    if (info.response.includes("OK")) {
      return 200;
    }
  } catch (error) {
    return 500;
  }
};

const recoveryPassMsg = async (token) => {
  try {
    const info = await transporter.sendMail({
      from: '"Recupero de contraseña" <proferc23@gmail.com>', // sender address
      to: "proferc23@gmail.com", // list of receivers
      subject: "Pasos para recuperar contraseña", // Subject line
      html: `
      <b>Haz click en el siguiente enlace para recuperar tu contraseña</b>
      <button>Haz click <a href='${process.env.URL_FRONT}/changePass/${token}'>aqui</a></button>
      `, // html body
    });

    if (info.response.includes("OK")) {
      return 200;
    }
  } catch (error) {
    return 500;
  }
};

module.exports = {
  userRegister,
  recoveryPassMsg,
};
