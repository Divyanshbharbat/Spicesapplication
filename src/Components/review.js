import mongoose from 'mongoose'

const reviewSchema = new mongoose.Schema({
  name: {
    type: String,
    default: 'Anonymous',
  },
  comment: {
    type: String,
    required: true,
    trim: true,
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,  // optional, link review to user
    ref: 'User',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

const Review=mongoose.model("Review",reviewSchema);
export default Review
