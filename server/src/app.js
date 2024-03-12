const compression = require("compression");
const cors = require("cors");
const express = require("express")

const app = express();

app.use(express.json());
app.use(compression());
app.use(cors());

module.exports = app;