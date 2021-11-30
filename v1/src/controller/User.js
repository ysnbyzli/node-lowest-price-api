const httpStatus = require("http-status");

const {
  list,
  getOneUserByFilter,
  insert,
  modify,
} = require("../services/User");
const {
  passwordToHash,
  generateAccessToken,
  generateRefreshToken,
  cloudinary,
} = require("../scripts/utils/helper");

const index = (req, res) => {
  list()
    .then((response) => {
      res.status(httpStatus.OK).json(response);
    })
    .catch(() =>
      res
        .status(httpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: "Kullanıcılar listelenirken bir hata oluştu!" })
    );
};

const create = async (req, res) => {
  req.body.password = passwordToHash(req.body.password);

  const user = await getOneUserByFilter({ username: req.body.username });
  if (user)
    return res
      .status(httpStatus.CONFLICT)
      .json({ message: "Bu kullanıcı adı kullanılıyor!" });

  insert(req.body)
    .then((response) => {
      res.status(httpStatus.CREATED).json(response);
    })
    .catch(() =>
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
        message: "Kullanıcı kaydedilirken beklenmedik bir hata oluştu!",
      })
    );
};

const login = (req, res) => {
  req.body.password = passwordToHash(req.body.password);

  getOneUserByFilter(req.body).then((user) => {
    if (!user)
      return res
        .status(httpStatus.NOT_FOUND)
        .json({ message: "Böyle bir kullanıcı bulunmamaktadır!" });

    user = {
      ...user.toObject(),
      tokens: {
        access_token: generateAccessToken(user._doc),
        refresh_token: generateRefreshToken(user._doc),
      },
    };
    delete user.password;
    res.status(httpStatus.OK).json(user);
  });
};

const update = async (req, res) => {
  try {
    if (req.file?.path) {
      const imageResult = await cloudinary.uploader.upload(req.file.path, {
        folder: "profiles",
        public_id: `${req.user._id}_profile`,
        width: 500,
        height: 500,
        crop: "fill",
        overwrite: true,
      });
      req.body.profile_image = imageResult.url;
    }
  } catch (error) {
    console.log(error);
  }

  modify({ _id: req.user._id }, req.body)
    .then((user) => {
      if (!user)
        return res
          .status(httpStatus.NOT_FOUND)
          .json({ message: "Kullanıcı bulunamadı!" });
      res.status(httpStatus.OK).json(user);
    })
    .catch(() =>
      res
        .status(httpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: "Kullanıcı güncellenirken bir hata oluştu" })
    );
};

module.exports = {
  index,
  create,
  login,
  update,
};
