import Joi from 'joi';

const nameSchema = Joi.object({
  first: Joi.string().min(2).max(256).required(),
  middle: Joi.string().max(256).allow(''),
  last: Joi.string().min(2).max(256).required()
});

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

export const validateUser = (user) => {
  const schema = Joi.object({
    name: nameSchema.required(),
    phone: Joi.string().pattern(/0[0-9]{1,2}\-?\s?[0-9]{3}\s?[0-9]{4}/).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(7).pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{7,}$/).required(),
    image: imageSchema,
    address: addressSchema.required(),
    isBusiness: Joi.boolean()
  });

  return schema.validate(user);
};

export const validateLogin = (user) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(7).required()
  });

  return schema.validate(user);
};

export const validateUserUpdate = (user) => {
  const schema = Joi.object({
    name: nameSchema,
    phone: Joi.string().pattern(/0[0-9]{1,2}\-?\s?[0-9]{3}\s?[0-9]{4}/),
    email: Joi.string().email(),
    image: imageSchema,
    address: addressSchema
  });

  return schema.validate(user);
};
