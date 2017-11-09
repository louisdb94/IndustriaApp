import * as mongoose from 'mongoose';

const CvSchema = new mongoose.Schema({
  name: String,
  mimetype: String,
  size: Number,
  uploader: String,
  number: {type:Number, default : 0}
});

const Cv = mongoose.model('cv', CvSchema);

export default Cv;
