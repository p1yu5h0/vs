const { Queue } = require("bullmq");

// const queueName = "video";
const { ALL_EVENTS: QUEUE_EVENTS } = require("./constants");
// const { updateHistory } = require("../models/video/service");

const reddisConnection = {
  host: "localhost",
  port: "6379",
};

const queues = Object.values(QUEUE_EVENTS).map((queuename) => {
  return {
    name: queuename,
    queueObj: new Queue(queuename, { connection: reddisConnection }),
  };
});

const addQueueItem = async (queueName, item) => {
  const queue = queues.find((q) => q.name === queueName);
  if (!queue) {
    throw new Error(`queue ${queueName} not found`);
  }
  // await updateHistory(item.id, {
    // status: queueName,
    // createdAt: new Date()
  // })
  await queue.queueObj.add(queueName, item, {
    removeOnComplete: true,
    removeOnFail: false,
  });
};

module.exports = {
  addQueueItem,
};
