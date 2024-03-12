const Joi = require('joi');

const schema = Joi.object().keys({
    _id : Joi.string().required(),
    title: Joi.string().min(3).max(20).required(),
    fileName: Joi.string().min(3).max(20).required(),
    originalName: Joi.string().min(3).max(20).required(),
    visibility: Joi.string().min(3).max(20).required(),
    // recordingDate: Joi.date().required(),
    videoLink: Joi.string().min(3).max(20).required(),
    description: Joi.string(),
    viewsCount: Joi.number(),
    // playlistId: Joi.string().min(3).max(20).required(),
    tags: Joi.array().items(Joi.string()),
    language: Joi.string(),
    category: Joi.string(),
    likesCount: Joi.number(),
    dislikesCount: Joi.number(),
    thumbnailUrl: Joi.string()
})

const validate = (data) => {
    const validateData = schema.validate(data);
    console.log(`Validated Result: ${validateData}`);
    return validateData;
}

module.exports = {
    validate
}