const jwt = require("jsonwebtoken");

module.exports = (role) => (req, res, next) => {
  try {
    const token = req.header("auth")?.replace("Bearer ", "");
    if (token) {
      const verifyToken = jwt.verify(token, process.env.JWT_SECRET);
      if (verifyToken.user.role === role) {
        req.idUser = verifyToken.user.idUser;
        req.idCart = verifyToken.user.idCart;
        req.idFav = verifyToken.user.idFav;

        next();
      } else {
        res.status(401).json({ msg: "No estas autorizado" });
      }
    } else {
      res.status(400).json({ msg: "Token incorrecto" });
    }
  } catch (error) {
    console.log(error);
  }
};
