const express = require('express')
const app = express()
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var Student = require("./models/student");
var cors = require('cors');
var port = process.env.PORT || 3000;

mongoose.connect('mongodb://vijay18399:lucky18399@ds149676.mlab.com:49676/chat', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  });


  const connection = mongoose.connection;

  connection.once("open", () => {
    console.log("MongoDB database connection established successfully!");
  });
  
  connection.on("error", err => {
    console.log(
      "MongoDB connection error. Please make sure MongoDB is running. " + err
    );
    process.exit();
  });

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.get('/', function (req, res) {
    return res.status(201).json("API Working");
})

app.get('/params/:studentid', function (req, res) {
    return res.status(201).json(req.params.studentid);
})

app.post('/posting', function (req, res) {
    return res.status(201).json(req.body);
})
app.post('/updating/:studentid', function (req, res) {
  dat = {
    body:req.body,
    params:req.params.studentid
  }
    return res.status(201).json(dat);
})




app.post('/create_student', function (req, res) {
    let newStudent = Student(req.body);
    newStudent.save((err, student) => {
      if (err) {
        return res.status(400).json({ msg: err });
      }
      return res.status(201).json(student);
   });
})
app.get('/students', function (req, res) {
    Student.find({},(err, students) => {
      if (students) {
        return res.status(201).json(students);
      }
    });
})
app.get('/students/:roll_number', function (req, res) {
    Student.find({roll_number : req.params.roll_number},(err, student) => {
      if (student) {
        return res.status(201).json(student);
      }
    });
})

app.post('/update_student', function (req, res) {
Student.updateOne({ _id : { $eq: req.body.roll_number } }, req.body, (err, data) => {
    if(data){
        return res.status(201).json({ data: data });
    }
    if (err) {
        return res.status(400).json({ msg: err });
    }
  });
});

app.listen(port);