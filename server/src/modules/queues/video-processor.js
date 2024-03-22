const ffmpeg = require("fluent-ffmpeg");
const ffmpegInstaller = require("@ffmpeg-installer/ffmpeg");
const path = require("path");
const fs = require("fs");
const { VIDEO_QUEUE_EVENTS: QUEUE_EVENTS } = require("./constants");
const { addQueueItem } = require("./queue");

const AWS = require("aws-sdk");
const s3 = new AWS.S3();

ffmpeg.setFfmpegPath(ffmpegInstaller.path);
console.log(ffmpegInstaller.path, ffmpegInstaller.version);

const executeToMp4 = async (filePath, outputFolder, jobData) => {
  const fileExt = path.extname(filePath);
  const fileNameWithoutExt = path.basename(filePath, fileExt);

  const outputFileName = `${outputFolder}/${fileNameWithoutExt}.mp4`;

  const uploadParams = {
    Bucket: "video-piyush-s3",
    Key: outputFileName,
    Body: ffmpeg(filePath).format("mp4").pipe(),
  };

  try {
    await s3.upload(uploadParams).promise();
    console.log("File uploaded successfully to S3:", outputFileName);
    await addQueueItem(QUEUE_EVENTS.VIDEO_PROCESSED, {
      ...jobData,
      completed: true,
      path: outputFileName,
    });
  } catch (error) {
    console.error("Error uploading file to S3:", error);
  }
};

const executeMp4ToHls = async (filePath, outputFolder, jobData) => {
  const fileExt = path.extname(filePath);
  const fileNameWithoutExt = path.basename(filePath, fileExt);

  const outputFileName = `${outputFolder}/${fileNameWithoutExt}.m3u8`;

  const uploadParams = {
    Bucket: "video-piyush-s3",
    Key: outputFileName,
    Body: ffmpeg(filePath).format("hls").pipe(),
  };

  try {
    await s3.upload(uploadParams).promise();
    console.log("File uploaded successfully to S3:", outputFileName);
    await addQueueItem(QUEUE_EVENTS.VIDEO_HLS_CONVERTED, {
      ...jobData,
      path: outputFileName,
    });
  } catch (error) {
    console.error("Error uploading file to S3:", error);
  }
};

module.exports = {
  executeToMp4,
  executeMp4ToHls,
};
