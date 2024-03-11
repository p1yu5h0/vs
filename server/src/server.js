const express = require("express");
const compression = require("compression");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(compression());
app.use(cors());

const PORT = 4000;

app.get("/", (req, res) => {
    console.log(`request received at ${new Date()}`);
    res.send(`request received at ${new Date()}`);
});

app.listen(PORT, async()=> {
    console.log(`Listening at ${PORT}`);
    console.log("application started", new Date().toTimeString());
})