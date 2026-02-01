import mongoose from 'mongoose';

const nameSchema = {
  first: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 256
  },
  middle: {
    type: String,
    maxlength: 256
  },
  last: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 256
  }
};

const imageSchema = {
  url: {
    type: String,
    default: "https://cdn.pixabay.com/photo/2016/04/01/10/11/avatar-1299805_960_720.png"
  },
  alt: {
    type: String,
    maxlength: 256
  }
};

const addressSchema = {
  state: {
    type: String,
    maxlength: 256
  },
  country: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 256
  },
  city: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 256
  },
  street: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 256
  },
  houseNumber: {
    type: Number,
    required: true,
    min: 1
  },
  zip: {
    type: Number
  }
};

const userSchema = new mongoose.Schema({
  name: nameSchema,
  phone: {
    type: String,
    required: true,
    match: /0[0-9]{1,2}\-?\s?[0-9]{3}\s?[0-9]{4}/
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/
  },
  password: {
    type: String,
    required: true,
    minlength: 7,
  },
  image: imageSchema,
  address: addressSchema,
  isAdmin: {
    type: Boolean,
    default: false
  },
  isBusiness: {
    type: Boolean,
    default: false
  },
  loginAttempts: {
    type: Number,
    default: 0
  },
  lockUntil: {
    type: Date
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

userSchema.virtual('isLocked').get(function () {
  return !!(this.lockUntil && this.lockUntil > Date.now());
});

import bcrypt from "bcrypt";

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});


export default mongoose.model('User', userSchema);
