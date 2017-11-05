import * as mongoose from 'mongoose';

<<<<<<< HEAD
const skill = new mongoose.Schema({
  name : String,
  value : Number
=======
const experienceSchema = new mongoose.Schema({
  function: Array,
  description: Array,
  period: Array
>>>>>>> master
})

const studentSchema = new mongoose.Schema({
  name: String,
  rnumber: String,
  whoami: { type: String, default: "Elon Musk" },
  degree: String,
  gradYear: Number,
<<<<<<< HEAD
  //whoami: String,
  skills: [mongoose.Schema.Types.Mixed]
=======
  skills: Array,
  skillsValue: [Number],
  experiences: []
>>>>>>> master
});

const Student = mongoose.model('Student', studentSchema);

export default Student;
