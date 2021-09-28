const Subject = require("../models/subject.js");

// Create and Save a new subject
exports.create = (req, res) => {
  console.log("#############################",req.body) 
  if (!req.body) {
        res.status(400).send({
          message: "Content can not be empty!"
        });
      }
    
      // Create a subject
      
      const subject = new Subject({
        sub_name : req.body.sub_name        
      });
    
      // Save subject in the database
      Subject.create(subject, (err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while creating the subject."
          });
        else res.send(data);
      });
};

// Retrieve all subject from the database.
exports.findAll = (req, res) => {
    Subject.getAll((err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while retrieving subjects."
          });
        else res.send(data);
      });
};

// Find a single subject with a subjectId
exports.findOne = (req, res) => {
    Subject.findById(req.params.subjectId, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found subject with sub_id ${req.params.subjectId}.`
            });
          } else {
            res.status(500).send({
              message: "Error retrieving subject with sub_id " + req.params.subjectId
            });
          }
        } else res.send(data);
      });
};

// Update a subject identified by the subjectId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  Subject.updateById(
    req.params.subjectId,
    new Subject(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found subject with sub_id ${req.params.subjectId}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating subject with sub_id " + req.params.subjectId
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a subject with the specified subjectId in the request
exports.delete = (req, res) => {
    Subject.remove(req.params.subjectId, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found subject with sub_id ${req.params.subjectId}.`
            });
          } else {
            res.status(500).send({
              message: "Could not delete subject with sub_id " + req.params.subjectId
            });
          }
        } else res.send({ message: `subject was deleted successfully!` });
      });
};

// Delete all subject from the database.
exports.deleteAll = (req, res) => {
    Subject.removeAll((err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while removing all subjects."
          });
        else res.send({ message: `All subjects were deleted successfully!` });
      });
};