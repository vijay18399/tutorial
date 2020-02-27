let server = require("http").createServer(app);
let io = require("socket.io")(server);
var mongoose = require("mongoose");
var Student = require("./models/student");
var Message = require("./models/message");
var cors = require('cors');
var port = process.env.PORT || 3000;
var express = require("express");
var app = express();

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
io.on("connection", socket => {

  socket.on("create", student => {
    let newStudent = Student(req.body);
    newStudent.save((err, student) => {
      if (err) {
        io.emit('error', err);
      }
      else{
        io.emit('newstudent', student);
      }
   });
  });

  socket.on("detain", student => {
      student.isDetained= true;
    Student.updateOne({ roll_number : { $eq: student.roll_number } }, student, (err, data) => {
        if(data){
            io.emit('student_detained', student);
        }
        if (err) {
            io.emit('error', err);
        }
      });
       
  });

  socket.on("gpa_updated", student => {
    Student.updateOne({ roll_number : { $eq: student.roll_number } }, student, (err, data) => {
      if(data){
        io.emit('gpa_updated', student);
      }
      if (err) {
        io.emit('error', err);
      }
    });
   
  });
  
  socket.on("send-message", message => {
    let newMessage = Message(message);
    newMessage.save(function(err, data) {
      if (err) {
        console.log(err);
      }
      if (data) {
        //channel = data.from + "-" + data.to;
        io.emit('message', data);
      }
    });
  });
});



var port = process.env.PORT || 5000;

server.listen(port, function() {
  console.log("socket.io listening in http://localhost:" + port);
});