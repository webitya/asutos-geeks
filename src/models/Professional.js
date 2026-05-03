import mongoose from 'mongoose';

const ProfessionalSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  name: {
    type: String,
    required: [true, 'Please provide a name.'],
  },
  skill: {
    type: String,
    required: [true, 'Please provide a skill.'],
  },
  location: {
    type: String,
    required: [true, 'Please provide a location.'],
  },
  address: String,
  city: String,
  state: String,
  country: String,
  resume: String,
  image: {
    type: String,
    required: [true, 'Please provide an image URL.'],
  },
  rating: {
    type: Number,
    default: 4.5,
  },
  bio: {
    type: String,
  },
  price: {
    type: Number,
    default: 0,
  }
}, { timestamps: true });

export default mongoose.models.Professional || mongoose.model('Professional', ProfessionalSchema);


