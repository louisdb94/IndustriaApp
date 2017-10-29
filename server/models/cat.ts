import * as mongoose from 'mongoose';

const catSchema = new mongoose.Schema({
  name: String,
  age: Number,
  weight: Number
});

const Cat = mongoose.model('Cat', catSchema);

export default Cat;
