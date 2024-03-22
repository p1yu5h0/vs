const http = require("http");
const fs = require("fs");
const path = require("path");

const port = 4001;
const publicDirectory = "./uploads/processed/hls";

const requestHandler = (req, res) => {
  const filePath = path.join(publicDirectory, req.url);
  console.log("filePath", filePath);

  fs.stat(filePath, (err, stats) => {
    if (err) {
      res.statusCode = 500;
      res.end(`Error reading file: ${err}`);
      return;
    }

    if (stats.isDirectory()) {
      res.statusCode = 403; // Forbidden
      res.end(`Directory access is forbidden: ${filePath}`);
      return;
    }

    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.statusCode = 500;
        res.end(`Error reading file: ${err}`);
        return;
      }
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.setHeader("Access-Control-Allow-Methods", "OPTIONS, GET");
      res.setHeader("Access-Control-Max-Age", 2592000); 
      res.end(data);
    });
  });
};

const server = http.createServer(requestHandler);

server.listen(port, (err) => {
  if (err) {
    console.error(`Error starting server: ${err}`);
    return;
  }

  console.log(`Server started on port ${port}`);
});
