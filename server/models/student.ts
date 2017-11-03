import * as mongoose from 'mongoose';

const experienceSchema = new mongoose.Schema({
  function: Array,
  description: Array,
  period: Array
})

const studentSchema = new mongoose.Schema({
  name: String,
  rnumber: String,
  whoami: { type: String, default: "Elon Musk" },
  degree: String,
  gradYear: Number,
  skills: Array,
  skillsValue: [Number],
  experiences: []
});

const Student = mongoose.model('Student', studentSchema);

export default Student;
