const httpStatus = require("http-status");
const uuid = require("uuid");

const {
  list,
  insert,
  getOneProductByFilter,
  deleteProduct,
  modify,
} = require("../services/Product");
const RecordService = require("../services/Record");
const { imageUploader } = require("../scripts/utils/helper");

const index = (req, res) => {
  list()
    .then((response) => {
      res.status(httpStatus.OK).json(response);
    })
    .catch(() =>
      res
        .status(httpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: "Ürünler listelenirken bir hata oluştu!" })
    );
};

const create = async (req, res) => {
  const product = await getOneProductByFilter({ barcod: req.body.barcod });
  if (product)
    return res
      .status(httpStatus.CONFLICT)
      .json({ message: "The product with this barcode already exists!" });

  let imageUrl;
  if (req.file?.path) {
    const result = await imageUploader(req.file.path, "products", uuid.v4());
    imageUrl = result.url;
  }

  const data = {
    image: imageUrl,
    user_id: req.user._id,
    ...req.body,
  };

  insert(data)
    .then((response) => {
      res.status(httpStatus.CREATED).json(response);
    })
    .catch((e) => res.status(httpStatus.INTERNAL_SERVER_ERROR).json(e));
};

const update = async (req, res) => {
  const product = await getOneProductByFilter({ _id: req.params.id });
  if (!product)
    res.status(httpStatus.NOT_FOUND).send({ message: "Ürün bulunamadı!" });

  if (product.user_id._id != req.user._id) {
    return res
      .status(httpStatus.FORBIDDEN)
      .send({ message: "Yetkisiz ürün güncelleme işlemi!" });
  }

  modify(product._id, req.body)
    .then((response) => {
      return res.status(httpStatus.OK).json(response);
    })
    .catch(() =>
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
        message:
          "Ürün silme işlemi sırasında bilinmeyen bir sorunla karşlınadı!",
      })
    );
};

const remove = async (req, res) => {
  const product = await getOneProductByFilter({ _id: req.params.id });
  if (!product)
    res.status(httpStatus.NOT_FOUND).send({ message: "Ürün bulunamadı!" });

  if (product.user_id._id != req.user._id) {
    return res
      .status(httpStatus.FORBIDDEN)
      .send({ message: "Yetkisiz ürün silme işlemi!" });
  }

  deleteProduct(product._id)
    .then((response) => {
      return res.status(httpStatus.OK).json(response);
    })
    .catch(() =>
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
        message:
          "Ürün silme işlemi sırasında bilinmeyen bir sorunla karşlınadı!",
      })
    );
};

const getProductRecordList = async (req, res) => {
  RecordService.list({ product: req.params.id })
    .then((response) => {
      if (!response)
        return res
          .status(httpStatus.NOT_FOUND)
          .send({ message: "Kayıt bulunamadı!" });
      res.status(httpStatus.OK).json(response);
    })
    .catch(() =>
      res
        .status(httpStatus.INTERNAL_SERVER_ERROR)
        .send({ message: "Ürün kayıtları çekilirken bir ata oluştu!" })
    );
};

const getProductById = async (req, res) => {
  getOneProductByFilter({ _id: req.params.id })
    .then((response) => {
      if (!response)
        return res
          .status(httpStatus.NOT_FOUND)
          .send({ message: "Ürün bulunamadı!" });
      res.status(httpStatus.OK).json(response);
    })
    .catch((e) =>
      res
        .status(httpStatus.INTERNAL_SERVER_ERROR)
        .send({ message: "Ürün listelenirken bir hata oluştu!" })
    );
};

module.exports = {
  index,
  create,
  update,
  remove,
  getProductRecordList,
  getProductById,
};
