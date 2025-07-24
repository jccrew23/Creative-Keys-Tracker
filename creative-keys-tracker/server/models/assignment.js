const mongoose = require('mongoose');
const student = require('./student');

// Define the schema for a assignment
const assignmentSchema = new mongoose.Schema({
  id: { type: String, required: true },
  studentId: { type: String, required: true, ref: 'Student' },
  warmUpName: { type: String},
  warmUpNotes: { type: String },
  techniquePage: { type: Number },
  techniqueNotes: { type: String },
  performancePage: { type: Number },
  performanceNotes: { type: String },
  theoryPage: { type: Number },
  theoryNotes: { type: String },
  additionalNotes: { type: String }
});

module.exports = mongoose.model('Assignment', assignmentSchema);
