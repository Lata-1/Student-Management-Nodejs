const Marks = require("../models/marks.js");

// Create and Save a new marks
exports.create = (req, res) => {
  console.log("#############################",req.body) 
  if (!req.body) {
         res.status(400).send({
          message: "Content can not be empty!"
        });
      }
    
      // Create a marks
      
      const marks = new Marks({
        grade : req.body.grade        
      });
    
      // Save marks in the database
      Marks.create(marks, (err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while creating the marks."
          });
        else res.send(data);
      });
};

// Retrieve all marks from the database.
exports.findAll = (req, res) => {
    Marks.getAll((err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while retrieving markss."
          });
        else res.send(data);
      });
};

// Find a single marks with a marksId
exports.findOne = (req, res) => {
    Marks.findById(req.params.marksId, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found marks with sub_id ${req.params.marksId}.`
            });
          } else {
            res.status(500).send({
              message: "Error retrieving marks with sub_id " + req.params.marksId
            });
          }
        } else res.send(data);
      });
};

// Update a marks identified by the marksId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  Marks.updateById(
    req.params.marksId,
    new Marks(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found marks with id ${req.params.marksId}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating marks with id " + req.params.marksId
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a marks with the specified marksId in the request
exports.delete = (req, res) => {
    Marks.remove(req.params.marksId, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found marks with id ${req.params.marksId}.`
            });
          } else {
            res.status(500).send({
              message: "Could not delete marks with id " + req.params.marksId
            });
          }
        } else res.send({ message: `marks was deleted successfully!` });
      });
};

// Delete all marks from the database.
exports.deleteAll = (req, res) => {
    Marks.removeAll((err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while removing all markss."
          });
        else res.send({ message: `All markss were deleted successfully!` });
      });
};