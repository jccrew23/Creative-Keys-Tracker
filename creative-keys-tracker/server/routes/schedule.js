var express = require('express');
var router = express.Router();
var Schedule = require('../models/schedule');
const sequenceGenerator = require('./sequenceGenerator');
const { convertTypeAcquisitionFromJson } = require('typescript');

router.get('/', (req, res, next) => {
  Schedule.find()
    .then(schedules => {
      res.status(200).json({
        message: 'Success',
        schedules: schedules
      });
    })
    .catch(error => {
      res.status(500).json({
        message: 'Error',
        error: error
      });
    });
});

router.post('/', (req, res, next) => {
  const maxScheduleId = sequenceGenerator.nextId('schedules');
  const schedule = new Schedule({
    id: maxScheduleId,
    studentId: req.body.studentId,
    day: req.body.day,
    time: req.body.time,
  });

  schedule.save()
    .then(result => {
      res.status(201).json({
        message: 'Schedule added successfully',
        schedule: result
      });
    })
    .catch(error => {
      res.status(500).json({
        message: 'Error adding schedule',
        error: error
      });
    });
});

router.put('/:id', (req, res, next) => {
  Schedule.findOne({ id: req.params.id })
    .then(schedule => {

      schedule.studentId = req.body.studentId;
      schedule.day = req.body.day;
      schedule.time = req.body.time;

      Schedule.updateOne({ id: req.params.id }, schedule)
        .then(result => {
          res.status(200).json({
            message: 'Schedule updated successfully',
            schedule: result
          });
        })
        .catch(error => {
          res.status(500).json({
            message: 'Error updating schedule',
            error: error
          });
        });
    })
    .catch(error => {
      res.status(500).json({
        message: 'Error updating schedule',
        error: error
      });
    });
});

router.delete('/:id', (req, res, next) => {
  Schedule.findOne({ id: req.params.id })
    .then(schedule => {
      Schedule.deleteOne({ id: req.params.id })
        .then(result => {
          res.status(200).json({
            message: 'Schedule deleted successfully',
            schedule: schedule
          });
        })
        .catch(error => {
          res.status(500).json({
            message: 'Error deleting schedule',
            error: error
          });
        });
    })
    .catch(error => {
      res.status(500).json({
        message: 'Error finding schedule to delete',
        error: error
      });
    });
});

module.exports = router;
