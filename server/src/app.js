const compression = require("compression");
const cors = require("cors");
const express = require("express")

const app = express();

app.use(express.json());
// app.use('/uploads', express.static('uploads/videos'))
// // app.use("/videos", express.static("uploads/videos"));
// app.use(express.static("uploads"));
// app.use(express.static("uploads/videos"));
app.use('/videos', express.static('uploads/videos'));
app.use(compression());

app.use(cors());

module.exports = app;