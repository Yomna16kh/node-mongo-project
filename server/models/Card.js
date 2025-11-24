import mongoose from 'mongoose';

const imageSchema = {
  url: {
    type: String,
    default: "https://cdn.pixabay.com/photo/2016/04/20/08/21/entrepreneur-1340649_960_720.jpg"
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

const cardSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 256
  },
  subtitle: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 256
  },
  description: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 1024
  },
  phone: {
    type: String,
    required: true,
    match: /0[0-9]{1,2}\-?\s?[0-9]{3}\s?[0-9]{4}/
  },
  email: {
    type: String,
    required: true,
    match: /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/
  },
  web: {
    type: String,
    match: /(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?/
  },
  image: imageSchema,
  address: addressSchema,
  bizNumber: {
    type: Number,
    required: true,
    unique: true,
    min: 1000000,
    max: 9999999
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Generate unique bizNumber before saving
cardSchema.pre('save', async function(next) {
  if (!this.bizNumber) {
    let bizNumber;
    let isUnique = false;
    
    while (!isUnique) {
      bizNumber = Math.floor(Math.random() * 9000000) + 1000000;
      const existingCard = await this.constructor.findOne({ bizNumber });
      if (!existingCard) {
        isUnique = true;
      }
    }
    
    this.bizNumber = bizNumber;
  }
  next();
});

export default mongoose.model('Card', cardSchema);
