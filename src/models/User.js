import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a name.'],
  },
  email: {
    type: String,
    required: [true, 'Please provide an email.'],
    unique: true,
  },
  phone: {
    type: String,
  },
  password: {
    type: String,
  },
  image: {
    type: String,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  googleId: {
    type: String,
  },
}, { timestamps: true });

export default mongoose.models.User || mongoose.model('User', UserSchema);
