const httpStatus = require("http-status");
const JWT = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
  const token = req.headers?.authorization?.split(" ")[1] || null;
  if (token === null) {
    return res.status(httpStatus.UNAUTHORIZED).send({
      message: "Bu işlemi yapmak için ilk olarak giriş yapmalısınız!",
    });
  }
  JWT.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY, (err, user) => {
    if (err) return res.status(httpStatus.FORBIDDEN).send({ message: err });
    req.user = user;
    next();
  });
};

module.exports = authenticateToken;
