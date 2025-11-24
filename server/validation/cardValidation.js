import Joi from 'joi';

const imageSchema = Joi.object({
  url: Joi.string().uri().allow(''),
  alt: Joi.string().max(256).allow('')
});

const addressSchema = Joi.object({
  state: Joi.string().max(256).allow(''),
  country: Joi.string().min(2).max(256).required(),
  city: Joi.string().min(2).max(256).required(),
  street: Joi.string().min(2).max(256).required(),
  houseNumber: Joi.number().min(1).required(),
  zip: Joi.number().allow('')
});

export const validateCard = (card) => {
  const schema = Joi.object({
    title: Joi.string().min(2).max(256).required(),
    subtitle: Joi.string().min(2).max(256).required(),
    description: Joi.string().min(2).max(1024).required(),
    phone: Joi.string().pattern(/0[0-9]{1,2}\-?\s?[0-9]{3}\s?[0-9]{4}/).required(),
    email: Joi.string().email().required(),
    web: Joi.string().pattern(/(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?/).allow(''),
    image: imageSchema,
    address: addressSchema.required(),
    bizNumber: Joi.number().min(1000000).max(9999999)
  });

  return schema.validate(card);
};

export const validateCardUpdate = (card) => {
  const schema = Joi.object({
    title: Joi.string().min(2).max(256),
    subtitle: Joi.string().min(2).max(256),
    description: Joi.string().min(2).max(1024),
    phone: Joi.string().pattern(/0[0-9]{1,2}\-?\s?[0-9]{3}\s?[0-9]{4}/),
    email: Joi.string().email(),
    web: Joi.string().pattern(/(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?/).allow(''),
    image: imageSchema,
    address: addressSchema,
    bizNumber: Joi.number().min(1000000).max(9999999)
  });

  return schema.validate(card);
};
