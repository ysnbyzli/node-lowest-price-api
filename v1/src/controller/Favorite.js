const httpStatus = require("http-status");
const {
  list,
  insert,
  remove,
  getOneFavoriteItemByFilter,
} = require("../services/Favorite");

const index = (req, res) => {
  list({ user: req.user._id })
    .then((response) => {
      res.status(httpStatus.OK).json(response);
    })
    .catch(() =>
      res
        .status(httpStatus.INTERNAL_SERVER_ERROR)
        .send({ message: "Favoriler listelenirken bir hata oluştu!" })
    );
};

const create = (req, res) => {
  req.body.user = req.user._id;
  insert(req.body)
    .then((response) => {
      res.status(httpStatus.CREATED).json(response);
    })
    .catch(() =>
      res
        .status(httpStatus.INTERNAL_SERVER_ERROR)
        .send({ message: "Favori ürün eklenirken bilinmeyen bir hata oluştu!" })
    );
};

const deleteFavorite = (req, res) => {
  const { id } = req.params;
  const user_id = req.user._id;
  getOneFavoriteItemByFilter({ product: id, user: user_id }).then(
    (deleteItem) => {
      if (!deleteItem)
        return res
          .status(httpStatus.NOT_FOUND)
          .send({ message: "Ürün bulunamadı" });
      remove(deleteItem._id)
        .then((response) => {
          return res.status(httpStatus.OK).json(response);
        })
        .catch(() => {
          res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
            message: "Favorilerden kaldırılırken bir sorunla kaşılaşıldı",
          });
        });
    }
  );
};

module.exports = {
  index,
  create,
  deleteFavorite,
};
