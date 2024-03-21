const ffmpeg = require("fluent-ffmpeg");
const path = require("path");
const fs = require('fs')
const { VIDEO_QUEUE_EVENTS: QUEUE_EVENTS } = require("./constants");
const { addQueueItem } = require("./queue");

const executeToMp4 = async (filePath, outputFolder, jobData) => {
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

    const outputFileName = `${subFolder}/mp4-${resolution}.mp4`;

    const command = ffmpeg(filePath)
      .output(outputFileName)
      .size(resolution)
      .on("start", function (commandLine) {
        console.log(`Spawned Ffmpeg with command for ${resolution}: ${commandLine}`);
      })
      .on("progress", function (progress) {
        if (parseInt(progress.percent) % 10 === 0) {
          console.log("Processing: " + progress.percent + "% done");
        }
      })
      .on("end", function () {
        console.log(`Finished processing ${resolution, outputFileName}`);
        addQueueItem(QUEUE_EVENTS.VIDEO_PROCESSED, { ...jobData, completed: true,
          path: outputFileName, });
      })
      .on("error", function (err) {
        console.log(`An error occurred for ${resolution}: ${err.message}`);
      })
      .run();

    outputFiles.push(outputFileName);
  }

  return;
};

const executeMp4ToHls = async (filePath, outputFolder, jobData) => {
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

    const outputFileName = `${subFolder}/hls-${resolution}.m3u8`;

    const command = ffmpeg(filePath)
      .output(outputFileName)
      .size(resolution)
      .on("start", function (commandLine) {
        console.log(`Spawned Ffmpeg with command for ${resolution}: ${commandLine}`);
      })
      .on("progress", function (progress) {
        if (parseInt(progress.percent) % 10 === 0) {
          console.log("Processing: " + progress.percent + "% done");
        }
      })
      .on("end", function () {
        console.log(`Finished processing ${resolution, outputFileName}`);
        addQueueItem(QUEUE_EVENTS.VIDEO_PROCESSED, { ...jobData, completed: true,
          path: outputFileName, });
      })
      .on("error", function (err) {
        console.log(`An error occurred for ${resolution}: ${err.message}`);
      })
      .run();

    outputFiles.push(outputFileName);
  }

  return;
};

module.exports = {
  executeToMp4, executeMp4ToHls
};
