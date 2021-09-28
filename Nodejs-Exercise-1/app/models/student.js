const sql = require("./db.js");

// constructor
const student = function(student) {
  this.student_id = student.student_id;				
  this.firstName = student.firstName;
  this.lastName = student.lastName;
  this.age = student.age;
  this.branch = student.branch;
};

student.create = (newstudent, result) => {
  sql.query("INSERT INTO student SET ?", newstudent, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created student: ", { id: res.insertId, ...student });
    result(null, { id: res.insertId, ...student });
  });
};

student.findById = (studentId, result) => {
  sql.query(`SELECT * FROM student WHERE student_id = ${studentId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found student: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found student with the id
    result({ kind: "not_found" }, null);
  });
};

student.getAll = result => {
  sql.query("SELECT * FROM student", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("student: ", res);
    result(null, res);
  });
};

student.updateById = (id, student, result) => {
  sql.query(
    "UPDATE student SET firstName = ?, lastName = ?, age = ?,branch = ? WHERE student_id = ?",
    [student.firstName, student.lastName, student.age, student.branch, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found student with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated student: ", { id: id, ...student });
      result(null, { id: id, ...student });
    }
  );
};

student.remove = (id, result) => {
  sql.query("DELETE FROM student WHERE student_id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found student with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted student with id: ", id);
    result(null, res);
  });
};

student.removeAll = result => {
  sql.query("DELETE FROM student", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} student`);
    result(null, res);
  });
};

module.exports = student;