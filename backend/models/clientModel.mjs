import mongoose from 'mongoose';

const clientSchema = new mongoose.Schema({
  name: String,
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    lowercase: true
  },
  phone: String,
  company: String,
  position: String,
  isVip: Boolean,
  status: {
    type: String,
    enum: ['active', 'inactive', 'awaiting_payment', 'debtor']
  },
  amount: String,
  dueDate: String,
  createAt: {
    type: Date,
    default: Date.now
  }
}, {timestamps: true});

export default mongoose.model('Client', clientSchema);