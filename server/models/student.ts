import * as mongoose from 'mongoose';


const skill = new mongoose.Schema({
  name : String,
  value : Number
})
const experienceSchema = new mongoose.Schema({
  function: Array,
  description: Array,
  period: Array

})

const uploads = new mongoose.Schema({
  name : String,
  mimetype : String,

})

const studentSchema = new mongoose.Schema({
  name: {type: String, default: "Elon Musk"},
  rnumber: String,
  whoami: { type: String, default: "Here is some general information about me" },
  degree: {type : String, default: "My Degree"},
  gradYear: Number,
  skills: Array,
  skillsValue: [Number],
  experiences: [],
  cv : [uploads],
  numberCv: {type: Number, default: 0},
  cvs: Array


});

const Student = mongoose.model('Student', studentSchema);

export default Student;
