const ffmpeg = require("fluent-ffmpeg");
const path = require("path");
const fs = require('fs')
const { QUEUE_EVENTS } = require("./constants");
const { addQueueItem } = require("./queue");

const execute = async (filePath, outputFolder, jobData) => {
  const fileName = path.basename(filePath);
  const extension = path.extname(filePath);
  const fileNameWithoutExt = path.basename(filePath, extension);

  const resolutions = ['1280x720', '854x480', '480x360'];
  const outputFiles = [];

  for (const resolution of resolutions) {
    const subFolder = `${outputFolder}/${fileNameWithoutExt}`;
    if (!fs.existsSync(subFolder)) {
      fs.mkdirSync(subFolder);
    }

    const outputFileName = `${subFolder}/${resolution}.mp4`;

    const command = ffmpeg(filePath)
      .output(outputFileName)
      .size(resolution)
      .on("start", function (commandLine) {
        console.log(`Spawned Ffmpeg with command for ${resolution}: ${commandLine}`);
      })
      .on("progress", function (progress) {
        console.log(`Processing ${resolution}: ${progress.percent}% done`);
      })
      .on("end", function () {
        console.log(`Finished processing ${resolution}`);
        addQueueItem(QUEUE_EVENTS.VIDEO_PROCESSED, { ...jobData });
      })
      .on("error", function (err) {
        console.log(`An error occurred for ${resolution}: ${err.message}`);
      })
      .run();

    outputFiles.push(outputFileName);
  }

  return { fileName, outputFiles };
};

module.exports = {
  execute,
};
