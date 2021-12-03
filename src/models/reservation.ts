import mongoose from 'mongoose';
import { APIDocument } from './interface';

const reservationSchema = new mongoose.Schema({
  wycieczka_id: mongoose.Types.ObjectId,
  username: String,
  miejsca: Number,
});

// eslint-disable-next-line func-names
reservationSchema.methods.response = function () {
  return {
    miejsca: this.miejsca,
    wycieczka_id: this.wycieczka_id,
  };
};

interface ReservationDocument extends APIDocument {
  miejsca: number,
  // eslint-disable-next-line camelcase
  wycieczka_id: string,
  username: string,
}

export default mongoose.model<ReservationDocument>('Reservation', reservationSchema);
