const sql = require("./db.js");

// constructor
const exam = function(exam) {
  this.exam_id = exam.exam_id;				
  this.exam_title = exam.exam_title;
  this.marks_obtained = exam.marks_obtained;
  this.max_marks = exam.max_marks;
};

exam.create = (newexam, result) => {
  sql.query("INSERT INTO exam SET ?", newexam, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created exam: ", { id: res.insertId, ...exam });
    result(null, { id: res.insertId, ...exam });
  });
};

exam.findById = (examId, result) => {
  sql.query(`SELECT * FROM exam WHERE exam_id = ${examId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found exam: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found exam with the id
    result({ kind: "not_found" }, null);
  });
};

exam.getAll = result => {
  sql.query("SELECT * FROM exam", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("exam: ", res);
    result(null, res);
  });
};

exam.updateById = (id, exam, result) => {
  sql.query(
    "UPDATE exam SET exam_title = ?, marks_obtained = ?, max_marks = ? WHERE exam_id = ?",
    [exam.exam_title, exam.marks_obtained,  exam.max_marks, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found exam with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated exam: ", { id: id, ...exam });
      result(null, { id: id, ...exam });
    }
  );
};

exam.remove = (id, result) => {
  sql.query("DELETE FROM exam WHERE exam_id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found exam with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted exam with id: ", id);
    result(null, res);
  });
};

exam.removeAll = result => {
  sql.query("DELETE FROM exam", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} exam`);
    result(null, res);
  });
};

module.exports = exam;