const multer = require("multer");
const { insert, search, getById, update, deleteById } = require("./service");
const { validate } = require("./request");
const { name, Video } = require("./model");
const { getDb } = require("../../db/mongo");


const db = getDb();

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
    ///my change
    title: function (req, file, cb) {
      cb(null, "this isssssss");
    },
    destination: function (req, file, cb) {
      cb(null, "uploads/videos");
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Math.round(Math.random());
      cb(null, file.fieldname + "-" + uniqueSuffix + ".mp4");
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
      // res.send(payload.title)
      return;
    } catch (error) {
      console.error(error);
      res.send(error);
    }
  });

  app.post(`${BASE_URL}/create`, async (req, res) => {
    console.log("POST create", req.body);
    const validationResult = validate(req.body);
    console.log(req.body);
    if (!validationResult.error) {
      try {
        const result = await insert(req.body);
        if (result instanceof Error) {
          res.status(400).json(JSON.parse(result.message));
          return;
        }
        return res.json(result);
      } catch (e) {
        return res.status(502).json(e);
      }
    }
    return res
      .status(400)
      .json({ status: "error", message: validationResult.error });
  });

  app.get(`${BASE_URL}/getvideo`, async (req, res) => {
    // console.log(" getvideo work ")
    const a= await Video.find().toArray();
let b= __dirname;

    console.log(a,b)
      return res.json(a);
      
      fs.readFile('demo.txt', (err, data) => {
        console.log(data);
     })
   

   
  });


  // app.get('/video', (req, res) => {
  //   const videoPath = '';
  //   const videoSize = fs.statSync(videoPath).size;
  
  //   // Set the Content-Type header
  //   res.setHeader('Content-Type', 'video/mp4');
  //   // Set the Content-Length header
  //   res.setHeader('Content-Length', videoSize);
  //   // Set the Accept-Ranges header
  //   res.setHeader('Accept-Ranges', 'bytes');
  
  //   // Create a readable stream for the video file
  //   const videoStream = fs.createReadStream(videoPath);
  
  //   // Pipe the video stream to the response object
  //   videoStream.pipe(res);
  // });
 
  app.use(() => (err, req, res, next) => {
    console.log("error handler", err);
    if (err instanceof multer.MulterError) {
      return res.status(418).send(err.code);
    }
    next();
  });
};

module.exports = {
  routes,
};
