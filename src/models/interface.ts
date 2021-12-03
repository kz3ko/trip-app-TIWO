import { Document } from 'mongoose';

interface JSON {
  [key: string]: string | number | JSON | string[] | number[] | JSON[];
}

export interface APIDocument extends Document {
  response(): JSON;
}
