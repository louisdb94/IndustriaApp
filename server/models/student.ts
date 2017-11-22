import * as mongoose from 'mongoose';


const studentSchema = new mongoose.Schema({
  name: {type: String, default: "Your name"},
  rnumber: { type: String, default: "r0000000" },
  whoami: { type: String, default: "Brief explanation about yourself." },
  degree: { type: String, default: "Your major" },
  gradYear: { type: Number, default: 2020},
  cvChecked: { type: Boolean, default: false},
  contactChecked: { type: Boolean, default: false},
  socialMedia: { type: Array, default: []},
  socialMediaChecked: { type: Array, default: [false, false, false, false]},
  experiences: { type: Array, default: ["Front end developer", "Designing webpages as a freelancer", "2013-2015", "IT Consultant", "Selling IT products to clients for Industria", "2015-2016"]},
  skills: { type: Array, default: ["SKILL", "SKILL", "SKILL"]},
  skillsValue: { type: Array, default: [75, "Intermediate", 25, "Learning", 50, "Basic"]},
  countSkills: { type: Number, default: 0, max: 6 },
  professional: { type: Array, default: ["Accuracy", "Punctuality"]},
  professionalValue: { type: Array, default: [50, "Basic", 75, "Intermediate"]},
  countProfessional: { type: Number, default: 0, max: 4 },
  language: { type: Array, default: ["Language", "Language"]},
  languageValue: { type: Array, default: [100, "Expert", 75, "Intermediate"]},
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
