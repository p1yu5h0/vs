const http = require("http");
const fs = require("fs");
const path = require("path");

const port = 4001;
const publicDirectory = "/Users/piyushagrawal/projects/video-sharing/server/uploads/processed/hls/";

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
        fs.readdir(filePath, (err, files) => {
          if (err) {
            res.statusCode = 500;
            res.end(`Error reading directory: ${err}`);
            return;
          }
          res.setHeader("Content-Type", "text/html");
          const fileList = files.map(file => `<li><a href="${file}" target="_blank">${file}</a></li>`).join('');
          res.end(`<h1>Directory Listing:</h1><ul>${fileList}</ul>`);
        });
      } else {
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
      }
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
