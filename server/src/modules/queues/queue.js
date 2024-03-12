const { Queue } = require('bullmq');

const queueName = "video";

const reddisConnection = {
    host: 'localhost',
    port: "6379"
}

const myQueue = new Queue(
    queueName,
    {
        connection: reddisConnection,
    }
)

const addQueueItem = async (item) => {
    await myQueue.add("video.uploaded", item, {
        removeOnComplete: true,
        removeOnFail: false
    })
}

module.exports = {
    addQueueItem
}