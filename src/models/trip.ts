import mongoose from 'mongoose';
import { APIDocument } from './interface';

const tripSchema = new mongoose.Schema({
  nazwa: {
    type: String,
    required: true,
  },
  docelowyKraj: {
    type: String,
    required: true,
  },
  dataRozpoczecia: {
    type: Date,
    required: true,
  },
  dataZakonczenia: {
    type: Date,
    required: true,
  },
  cena: {
    type: Number,
    required: true,
  },
  maxMiejsc: {
    type: Number,
    required: true,
  },
  opis: {
    type: String,
    required: true,
  },
  zdjecie: {
    type: String,
    required: true,
  },
  rezerwowane: {
    type: Number,
    required: true,
  },
  oceny: [{
    username: { type: String, required: true },
    gwiazdki: Number,
    komentarz: { type: String, required: true },
  }],
  galeria: [String],
  deleted: Boolean,
});

// eslint-disable-next-line func-names
tripSchema.methods.response = function () {
  return {
    ...this.toJSON(),
  };
};

interface TripDocument extends APIDocument {
  nazwa: string,
  docelowyKraj: string,
  dataRozpoczecia: Date,
  dataZakonczenia: Date,
  cena: number,
  maxMiejsc: number,
  opis: string,
  zdjecie: string,
  rezerwowane: number,
  oceny: [{
    // eslint-disable-next-line camelcase
    username: string,
    gwiazdki?: number,
    komentarz: string,
  }],
  galeria: string[],
  deleted: boolean,
}

export default mongoose.model<TripDocument>('Trip', tripSchema);
