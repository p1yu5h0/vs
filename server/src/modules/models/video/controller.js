const multer = require('multer');
const { insert, search, getById, update, deleteById } = require("./service");
const { validate } = require("./request");
const { name } = require("./model");


const BASE_URL = `/api/${name}`;

const routes = (app) => {
  app.get(`${BASE_URL}`, (req, resp) => {
    resp.send({
      status: "success",
      message: "OK",
      timestamp: new Date(),
    });
  });

  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "uploads/videos");
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      cb(null, file.fieldname + "-" + uniqueSuffix);
    },
  });

  const fileFilter = (req, file, cb) => {
    if (file.mimetype === "video/mp4" || file.mimetype === "video/x-matroska") {
      console.log("file type supported", file);
      cb(null, true);
    } else {
      console.log("file type not supported", file);
      cb(null, false);
    }
  };

  const upload = multer({
    dest: "uploads/videos",
    fileFilter: fileFilter,
    limits: { fileSize: 50000000 },
    storage: storage,
  }).single("video");

  const uploadProcessor = (req, res, next) => {
    upload(req, res, (err) => {
      if (err) {
        console.error(err);
        res.status(400).json({ status: "error", message: err });
      } else {
        console.log("upload success", req.file);
        next();
      }
    });
  };

  app.post(`${BASE_URL}/upload`, uploadProcessor, async (req, res) => {
    try {
      console.log("POST upload", JSON.stringify(req.body));
      const payload = { ...req.body };
      console.log("user given metadata", "title", payload.title);
      res.send(req.file);
      return;
    } catch (error) {
      console.error(error);
      res.send(error);
    }
  });

  app.use(() => (err, req, res, next) => {
    console.log("error handler", err);
    if (err instanceof multer.MulterError) {
      return res.status(418).send(err.code);
    }
    next();
  });
};

module.exports = {
    routes
}