import * as mongoose from 'mongoose';


const studentSchema = new mongoose.Schema({
  name: {type: String, default: "Elon Musk"},
  rnumber: { type: String, default: "r0000000" },
  whoami: { type: String, default: "Brief explanation about yourself." },
  degree: { type: String, default: "Electromechanics" },
  gradYear: { type: Number, default: 2020},
  cvChecked: { type: Boolean, default: false},
  contactChecked: { type: Boolean, default: false},
  socialMedia: { type: Array, default: []},
  socialMediaChecked: { type: Array, default: [false, false, false, false]},
  experiences: { type: Array, default: ["Engineer", "Good Engineer", "2014-2017", "Engineer", "Good Engineer", "2014-2017"]},
  skills: { type: Array, default: ["SKILL", "SKILL", "SKILL", "SKILL", "SKILL", "SKILL"]},
  skillsValue: { type: Array, default: [75, "Intermediate", 25, "Learning", 50, "Basic", 25, "Learning", 75, "Intermediate", 75, "Intermediate", 75, "Intermediate", 75, "Intermediate", 75, "Intermediate"]},
  countSkills: { type: Number, default: 0, max: 6 },
  language: { type: Array, default: ["Language", "Language", "Language"]},
  languageValue: { type: Array, default: [100, "Expert", 75, "Intermediate", 50, "Basic"]},
  countLanguage: { type: Number, default: 0, max: 4 },
  education: { type: Array, default: ["Bachelor", "KU Leuven", "Master ", "KU Leuven"]},
  educationDate: { type: Array, default: ["2005 October", "2011 February", "2005 October", "2011 February"]},
  countEducation: { type: Number, default: 0, max: 7 },
  contact: { type: Array, default: []},
  numberCv: {type: Number, default: 0},
  cvs: { type: Array, default: []},
  image: {type: Boolean, default: false}
});


const Student = mongoose.model('Student', studentSchema);

export default Student;
