const httpStatus = require("http-status");
const { list, insert } = require("../services/Record");

const index = (req, res) => {
  list()
    .then((response) => {
      return res.status(httpStatus.OK).json(response);
    })
    .catch(() => {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
        message: "Kayıtlar listelenirken bilinmeyen bir hata oluştu!",
      });
    });
};

const create = (req, res) => {
  req.body.user = req.user._id;
  insert(req.body)
    .then((response) => {
      return res.status(httpStatus.OK).json(response);
    })
    .catch(() => {
      res
        .status(httpStatus.INTERNAL_SERVER_ERROR)
        .send({ message: "Kayıt eklenirken bilinmeyen bir hata oluştu!" });
    });
};

module.exports = {
  index,
  create,
};
