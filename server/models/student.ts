import * as mongoose from 'mongoose';

const skill = new mongoose.Schema({
  name : String,
  value : Number
})

const studentSchema = new mongoose.Schema({
  name: String,
  rnumber: String,
  whoami: { type: String, default: "Elon Musk" },
  degree: String,
  gradYear: Number,
  //whoami: String,
  skills: [mongoose.Schema.Types.Mixed]
});

const Student = mongoose.model('Student', studentSchema);

export default Student;
