module.exports = app => {
    const marks = require("../controllers/marksController");

  
    // Create a new marks
    app.post("/api/marks", marks.create);
  
    // Retrieve all marks
    app.get("/api/marks", marks.findAll);
  
    // Retrieve a single marks with marksId
    app.get("/api/marks/:marksId", marks.findOne);
  
    // Update a marks with marksId
    app.put("/api/marks/:marksId", marks.update);
  
    // Delete a marks with marksId
    app.delete("/api/marks/:marksId", marks.delete);
  
    // Create a new marks
    app.delete("/api/marks", marks.deleteAll);
  };