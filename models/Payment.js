import mongoose from 'mongoose';

// Define the payment schema
const paymentSchema = new mongoose.Schema({
  paymentId: {
    type: String,
    required: true,
  },
  payerId: {
    type: String,
    required: true,
  },
  paymentStatus: {
    type: String,
    required: true,
  },
  paymentAmount: {
    type: Number,
    required: true,
  },
  paymentCurrency: {
    type: String,
    required: true,
  },
  bookingId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Booking',
    required: true,
  },
});

export default mongoose.model('Payment', paymentSchema);
