var Sequence = require('../models/sequence');

var maxStudentId;
var maxAssignmentId;
var maxScheduleId;
var sequenceId = null;

function SequenceGenerator() {

  Sequence.findOne().exec()
  .then(sequence => {
    if (sequence) {
      sequenceId = sequence._id;
      maxStudentId = sequence.maxStudentId;
      maxAssignmentId = sequence.maxAssignmentId;
      maxScheduleId = sequence.maxScheduleId;
      console.log('Sequence generator initialized successfully');
    } else {
      console.log('No sequence found in database');
    }
  })
  .catch(err => {
    console.error('Error initializing sequence generator:', err);
  });
}

SequenceGenerator.prototype.nextId = function(collectionType) {

  var updateObject = {};
  var nextId;

  switch (collectionType) {
    case 'students':
      maxStudentId++;
      updateObject = {maxStudentId: maxStudentId};
      nextId = maxStudentId;
      break;
    case 'assignments':
      maxAssignmentId++;
      updateObject = {maxAssignmentId: maxAssignmentId};
      nextId = maxAssignmentId;
      break;
    case 'schedule':
      maxScheduleId++;
      updateObject = {maxScheduleId: maxScheduleId};
      nextId = maxScheduleId;
      break;
    default:
      return -1;
  }

  Sequence.updateOne({_id: sequenceId}, {$set: updateObject})
    .then(() => {
      console.log(`Updated ${collectionType} sequence to ${nextId}`);
    })
    .catch(err => {
      console.log("nextId error = " + err);
    });
}

module.exports = new SequenceGenerator();
