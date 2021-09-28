module.exports = app => {
    const exam = require("../controllers/examController");

  
    // Create a new exam
    app.post("/api/exam", exam.create);
  
    // Retrieve all exam
    app.get("/api/exam", exam.findAll);
  
    // Retrieve a single exam with examId
    app.get("/api/exam/:examId", exam.findOne);
  
    // Update a exam with examId
    app.put("/api/exam/:examId", exam.update);
  
    // Delete a exam with examId
    app.delete("/api/exam/:examId", exam.delete);
  
    // Create a new exam
    app.delete("/api/exam", exam.deleteAll);
  };