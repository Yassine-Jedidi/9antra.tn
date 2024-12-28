import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  price: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
}, { timestamps: false });

export default mongoose.model('Course', courseSchema); 