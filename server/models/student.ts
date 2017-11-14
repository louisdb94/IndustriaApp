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
  name: { type: String, default: "Elon Musk" },
  rnumber: { type: String, default: "r0000000" },
  whoami: { type: String, default: "I am a South African-born Canadian American business magnate, investor, engineer, and inventor. He is the founder, CEO, and CTO of SpaceX; a co-founder, Series A investor, CEO, and product architect of Tesla Inc.; co-chairman of OpenAI; and founder and CEO of Neuralink. Musk is also a co-founder and former chairman of SolarCity, co-founder of Zip2, and founder of X.com, which merged with Confinity and took the name PayPal." },
  degree: { type: String, default: "Electromechanics" },
  gradYear: { type: Number, default: 2018},
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
