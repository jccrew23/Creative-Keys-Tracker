const mongoose = require('mongoose');

// Define the schema for a sequence
const sequenceSchema = new mongoose.Schema({
  maxAssignmentId: { type: Number },
  maxStudentId: { type: Number },
  maxAppointmentId: { type: Number }
});

module.exports = mongoose.model('Sequence', sequenceSchema);
