const { Video, name } = require("./model");

const insert = async (document) => {
  try {
    const result = Video.insertOne(document);
    return result;
  } catch (err) {
    return err;
  }
};

const search = async (searchObject) => {
  const result = await Video.find(searchObject).toArray();
  return result;
};

const getById = async (id) => {
  try {
    const Video = await Video.findOne({
      _id: id,
    });
    return Video;
  } catch (err) {
    return err;
  }
};

const update = async (id) => {
  try {
    const updatedDoc = await Video.updateOne(
      { _id: id },
      { $set: { ...document } }
    );
    return updatedDoc;
  } catch (error) {
    console.error(error);
    return error;
  }
};

const deleteById = async (id) => {
  try {
    const deleted = await Video.deleteOne({
      _id: id,
    });
    return deleted;
  } catch (error) {
    console.error(error);
    return error;
  }
};

module.exports = {
    insert,
    search,
    getById,
    update,
    deleteById
}
