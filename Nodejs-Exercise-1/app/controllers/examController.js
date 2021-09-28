const Exam = require("../models/exam.js");

// Create and Save a new exam
exports.create = (req, res) => {
  console.log("#############################", req.body)
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a exam

  const exam = new Exam({
    exam_title: req.body.exam_title,
    marks_obtained: req.body.marks_obtained,
    max_marks: req.body.max_marks
  });

  // Save exam in the database
  Exam.create(exam, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the exam."
      });
    else res.send(data);
  });
};

// Retrieve all exam from the database.
exports.findAll = (req, res) => {
  Exam.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving exams."
      });
    else res.send(data);
  });
};

// Find a single exam with a examId
exports.findOne = (req, res) => {
  Exam.findById(req.params.examId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found exam with id ${req.params.examId}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving exam with id " + req.params.examId
        });
      }
    } else res.send(data);
  });
};

// Update a exam identified by the examId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  Exam.updateById(
    req.params.examId,
    new exam(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found exam with id ${req.params.examId}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating exam with id " + req.params.examId
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a exam with the specified examId in the request
exports.delete = (req, res) => {
  Exam.remove(req.params.examId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found exam with id ${req.params.examId}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete exam with id " + req.params.examId
        });
      }
    } else res.send({ message: `exam was deleted successfully!` });
  });
};

// Delete all exam from the database.
exports.deleteAll = (req, res) => {
  Exam.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all exams."
      });
    else res.send({ message: `All exams were deleted successfully!` });
  });
};