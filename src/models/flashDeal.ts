import mongoose from 'mongoose';

const flashDealSchema = new mongoose.Schema({
  expires_at: {
    type: Date,
    required: true,
  },
  starts_at: {
    type: Date,
    required: true,
  },
  wycieczka_id: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  discount: Number,
});

interface FlashDealDocument extends mongoose.Document {
  expires_at: Date;
  starts_at: Date;
  wycieczka_id: string;
  discount: number;
}

export default mongoose.model<FlashDealDocument>('FlashDeal', flashDealSchema);
