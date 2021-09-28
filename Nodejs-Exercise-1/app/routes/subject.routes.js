module.exports = app => {
    const subject = require("../controllers/subjectController");
  
    // Create a new subject
    app.post("/api/subject", subject.create);
  
    // Retrieve all subject
    app.get("/api/subject", subject.findAll);
  
    // Retrieve a single subject with subjectId
    app.get("/api/subject/:subjectId", subject.findOne);
  
    // Update a subject with subjectId
    app.put("/api/subject/:subjectId", subject.update);
  
    // Delete a subject with subjectId
    app.delete("/api/subject/:subjectId", subject.delete);
  
    // Create a new subject
    app.delete("/api/subject", subject.deleteAll);
  };