const Joi = require('joi');

const schema = Joi.object().keys({
    _id : Joi.string().required(),
    title: Joi.string().min(3).max(20).required(),
    fileName: Joi.string().min(3).max(20).required(),
    validity: Joi.string().min(3).max(20).required(),
    recordingDate: Joi.date().required(),
    videoLink: Joi.string().min(3).max(20).required(),
})

const validate = (data) => {
    const validateData = schema.validate(data);
    console.log(`Validated Result: ${validateData}`);
    return validateData;
}

module.exports = {
    validate
}