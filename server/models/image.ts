import * as mongoose from 'mongoose';

const ImageSchema = new mongoose.Schema({
  name: String,
  mimetype: String,
  uploader: String,
  data: String
});

const Image = mongoose.model('image', ImageSchema);

export default Image;
