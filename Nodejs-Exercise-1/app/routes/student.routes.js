module.exports = app => {
    const student = require("../controllers/studentController");

  
    // Create a new student
    app.post("/api/student", student.create);
  
    // Retrieve all student
    app.get("/api/student", student.findAll);
  
    // Retrieve a single student with studentId
    app.get("/api/student/:studentId", student.findOne);
  
    // Update a student with studentId
    app.put("/api/student/:studentId", student.update);
  
    // Delete a student with studentId
    app.delete("/api/student/:studentId", student.delete);
  
    // Create a new student
    app.delete("/api/student", student.deleteAll);
  };