const sql = require("./db.js");

// constructor
const subject = function(subject) { 			
  this.sub_name = subject.sub_name;  
};

subject.create = (newsubject, result) => {
  sql.query("INSERT INTO subject SET ?", newsubject, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created subject: ", { id: res.insertId, ...subject });
    result(null, { id: res.insertId, ...subject });
  });
};

subject.findById = (subjectId, result) => {
  sql.query(`SELECT * FROM subject WHERE sub_id = ${subjectId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found subject: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found subject with the id
    result({ kind: "not_found" }, null);
  });
};

subject.getAll = result => {
  sql.query("SELECT * FROM subject", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("subject: ", res);
    result(null, res);
  });
};

subject.updateById = (id, subject, result) => {
  sql.query(
    "UPDATE subject SET sub_name = ? WHERE sub_id = ?",
    [subject.sub_name, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found subject with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated subject: ", { id: id, ...subject });
      result(null, { id: id, ...subject });
    }
  );
};

subject.remove = (id, result) => {
  sql.query("DELETE FROM subject WHERE sub_id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found subject with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted subject with id: ", id);
    result(null, res);
  });
};

subject.removeAll = result => {
  sql.query("DELETE FROM subject", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} subject`);
    result(null, res);
  });
};

module.exports = subject;