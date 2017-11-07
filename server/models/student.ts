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

const cv = new mongoose.Schema({
  name : String,
  mimetype : String,

})

const studentSchema = new mongoose.Schema({
  name: String,
  rnumber: String,
  whoami: { type: String, default: "Elon Musk" },
  degree: String,
  gradYear: Number,
  skills: Array,
  skillsValue: [Number],
  experiences: [],
  cv : [cv],
  imgs: [cv],


});

const Student = mongoose.model('Student', studentSchema);

export default Student;
