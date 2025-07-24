var express = require("express");
var router = express.Router();
const sequenceGenerator = require("./sequenceGenerator");
var Student = require("../models/student");

router.get("/", (req, res, next) => {
  Student.find()
    .then((students) => {
      res.status(200).json({
        message: "Success",
        students: students,
      });
    })
    .catch((error) => {
      console.error('Error fetching students from database:', error);
      res.status(500).json({
        message: "Error",
        error: error,
      });
    });
});

router.post("/", (req, res, next) => {
  if (!maxStudentId) {
      return res.status(500).json({
        message: "Failed to generate student ID",
      });
    }
  const student = new Student({
    id: maxStudentId,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    age: req.body.age,
    level: req.body.level,
    parentName: req.body.parentName,
    parentRelationship: req.body.parentRelationship,
    parentEmail: req.body.parentEmail,
    parentPhone: req.body.parentPhone,
  });

  student
    .save()
    .then((result) => {
      res.status(201).json({
        message: "Student added successfully",
        student: result,
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: "Error adding student",
        error: error,
      });
    });
});

router.put("/:id", (req, res, next) => {
  Student.findOne({ id: req.params.id })
    .then((student) => {
      student.firstName = req.body.firstName;
      student.lastName = req.body.lastName;
      student.age = req.body.age;
      student.level = req.body.level;
      student.parentName = req.body.parentName;
      student.parentRelationship = req.body.parentRelationship;
      student.parentEmail = req.body.parentEmail;
      student.parentPhone = req.body.parentPhone;

      Student.updateOne({ id: req.params.id }, student)
        .then((result) => {
          res.status(200).json({
            message: "Student updated successfully",
            student: student,
          });
        })
        .catch((error) => {
          res.status(500).json({
            message: "Error updating student",
            error: error,
          });
        });
    })
    .catch((error) => {
      res.status(500).json({
        message: "Student not found",
        error: error,
      });
    });
});

router.delete("/:id", (req, res, next) => {
  Student.findOne({ id: req.params.id })
    .then((student) => {
      Student.deleteOne({ id: req.params.id })
        .then((result) => {
          res.status(200).json({
            message: "Student deleted successfully",
            student: student,
          });
        })
        .catch((error) => {
          res.status(500).json({
            message: "Error deleting student",
            error: error,
          });
        });
    })
    .catch((error) => {
      res.status(500).json({
        message: "Student not found",
        error: error,
      });
    });
});

module.exports = router;
