const express = require("express");
const bodyParser = require("body-parser");
const app = express();
let studentRoute=require("./app/routes/student.routes.js");
let subjectRoute=require("./app/routes/subject.routes.js");
let examRoute=require("./app/routes/exam.routes.js");
let marksRoute=require("./app/routes/marks.routes.js");

//parse requests of content-type :appliction/json
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", (req,res) =>{
    res.json({message: "Welcome to application."});
});

studentRoute(app)
subjectRoute(app)
examRoute(app)
marksRoute(app)

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});