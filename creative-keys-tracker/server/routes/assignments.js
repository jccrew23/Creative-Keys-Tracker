var express = require('express');
var router = express.Router();
const sequenceGenerator = require('./sequenceGenerator');
const Assignment = require('../models/assignment');

// Get all assignments
router.get('/', (req, res, next) => {
  Assignment.find()
    .then(assignments => {
      res.status(200).json({
        message: 'Success',
        assignments: assignments
      });
    })
    .catch(error => {
      res.status(500).json({
        message: 'Error',
        error: error
      });
    });
});

//add a new assignment
router.post('/', (req, res, next) => {
  const maxAssignmentId = sequenceGenerator.nextId('assignments');
  const assignment = new Assignment({
    id: maxAssignmentId,
    studentId: req.body.studentId,
    warmUpName: req.body.warmUpName,
    warmUpNotes: req.body.warmUpNotes,
    techniquePage: req.body.techniquePage,
    techniqueNotes: req.body.techniqueNotes,
    performancePage: req.body.performancePage,
    performanceNotes: req.body.performanceNotes,
    theoryPage: req.body.theoryPage,
    theoryNotes: req.body.theoryNotes,
    additionalNotes: req.body.additionalNotes
  });

  assignment.save()
    .then(result => {
      res.status(201).json({
        message: 'Assignment added successfully',
        assignment: result
      });
    })
    .catch(error => {
      res.status(500).json({
        message: 'Error adding assignment',
        error: error
      });
    });
});

router.put('/:id', (req, res, next) => {
  Assignment.findOne({ id: req.params.id })
    .then(assignment => {

      assignment.studentId = req.body.studentId;
      assignment.warmUpName = req.body.warmUpName;
      assignment.warmUpNotes = req.body.warmUpNotes;
      assignment.techniquePage = req.body.techniquePage;
      assignment.techniqueNotes = req.body.techniqueNotes;
      assignment.performancePage = req.body.performancePage;
      assignment.performanceNotes = req.body.performanceNotes;
      assignment.theoryPage = req.body.theoryPage;
      assignment.theoryNotes = req.body.theoryNotes;
      assignment.additionalNotes = req.body.additionalNotes;

      Assignment.updateOne({ id: req.params.id }, assignment)
        .then(result => {
          res.status(200).json({
            message: 'Assignment updated successfully',
            assignment: result
          });
        })
        .catch(error => {
          res.status(500).json({
            message: 'Error updating assignment',
            error: error
          });
        });
    })
    .catch(error => {
      res.status(500).json({
        message: 'Assignment not found',
        error: error
      });
    });
});

router.delete('/:id', (req, res, next) => {
  Assignment.findOne({ id: req.params.id })
    .then(assignment => {
      Assignment.deleteOne({ id: req.params.id })
        .then(result => {
          res.status(200).json({
            message: 'Assignment deleted successfully',
            assignment: assignment
          });
        })
        .catch(error => {
          res.status(500).json({
            message: 'Error deleting assignment',
            error: error
          });
        });
    })
    .catch(error => {
      res.status(500).json({
        message: 'Assignment not found',
        error: error
      });
    });
});

module.exports = router;
