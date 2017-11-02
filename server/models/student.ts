import * as mongoose from 'mongoose';

const studentSchema = new mongoose.Schema({
  name: String,
  rnumber: String,
  whoami: { type: String, default: "Elon Musk" },
  degree: String,
  gradYear: Number,
  //whoami: String,
  skills: Array,
});

const Student = mongoose.model('Student', studentSchema);

export default Student;
