import * as mongoose from 'mongoose';

const CvSchema = new mongoose.Schema({
  name: String,
  mimetype: String,
  size: Number,
  uploader: String,
  number: {type:Number, default : 1},
  customName: {type: String, default: 'Curriculum vitae'}
});

const Cv = mongoose.model('cv', CvSchema);

export default Cv;
