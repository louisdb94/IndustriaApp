import * as mongoose from 'mongoose';

const studentSchema = new mongoose.Schema({
  name: String,
  degree: String,
  gradYear: Number,
  whoami: String,
});

const Student = mongoose.model('Student', studentSchema);

export default Student;
