const mongoose = require('mongoose');

const scheduleSchema = new mongoose.Schema({
  id: { type: String, required: true },
  studentId: { type: String, required: true, ref: 'Student' },
  day: { type: String, required: true },
  time: { type: String, required: true }
});

module.exports = mongoose.model('Schedule', scheduleSchema);
