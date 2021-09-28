const sql = require("./db.js");

// constructor
const marks = function(marks) { 			
  this.grade = marks.grade;  
};

marks.create = (newmarks, result) => {
  sql.query("INSERT INTO marks SET ?", newmarks, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created marks: ", { id: res.insertId, ...marks });
    result(null, { id: res.insertId, ...marks });
  });
};

marks.findById = (marksId, result) => {
  sql.query(`SELECT * FROM marks WHERE sub_id = ${marksId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found marks: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found marks with the id
    result({ kind: "not_found" }, null);
  });
};

marks.getAll = result => {
  sql.query("SELECT * FROM marks", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("marks: ", res);
    result(null, res);
  });
};

marks.updateById = (id, marks, result) => {
  sql.query(
    "UPDATE marks SET grade = ? WHERE id = ?",
    [marks.grade, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found marks with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated marks: ", { id: id, ...marks });
      result(null, { id: id, ...marks });
    }
  );
};

marks.remove = (id, result) => {
  sql.query("DELETE FROM marks WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found marks with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted marks with id: ", id);
    result(null, res);
  });
};

marks.removeAll = result => {
  sql.query("DELETE FROM marks", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} marks`);
    result(null, res);
  });
};

module.exports = marks;