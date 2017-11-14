import * as mongoose from 'mongoose';

const experienceSchema = new mongoose.Schema({
  function: Array,
  description: Array,
  period: Array
})

const uploads = new mongoose.Schema({
  name: String,
  mimetype: String
})

const studentSchema = new mongoose.Schema({
  name: String,
  rnumber: String,
  whoami: { type: String, default: "Elon Musk" },
  degree: String,
  gradYear: Number,
  skills: Array,
  skillsValue: [],
  experiences: [],
  countExperiences: { type: Number, default: 0, max: 6 },
  education: [],
  educationDate: [],
  countEducation: { type: Number, default: 0, max: 7 },
  cv: [[uploads]]
});

const Student = mongoose.model('Student', studentSchema);

export default Student;
