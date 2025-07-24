const mongoose = require('mongoose');

// Define the schema for a student
const studentSchema = new mongoose.Schema({
  id: {type: String, required: true},
  firstName: {type: String, required: true},
  lastName: {type: String, required: true},
  age: {type: Number, required: true},
  level: {type: String},
  parentName: {type: String, required: true},
  parentRelationship: {type: String},
  parentEmail: {type: String, required: true},
  parentPhone: {type: String, required: true},
});

module.exports = mongoose.model('Student', studentSchema);
