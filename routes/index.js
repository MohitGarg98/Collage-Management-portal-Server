var express = require('express');
const Cookies = require('universal-cookie');
var router = express.Router();
const path = require("path");
const multer = require("multer");
const Student = require('../models/student');
const Teacher = require('../models/teacher');
const AddAssignment = require('../models/add_assignment');
const SubmitAssignment = require('../models/submitted_assignment');
const fs = require('fs');

var storage = multer.diskStorage({
      destination: function (req, file, cb) {
      cb(null, 'public/files');
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '-' +file.originalname )
    }
})

var upload = multer({ storage: storage });

router.post('/student-login', function(req, res) {
  // res.set('Access-Control-Allow-Credentials', true);
  const email = req.body.email;
  const password = req.body.password;
  Student.findOne({email: email}, function (err, student) {
    if(err){console.log(err);}
    else{
      if(student){
        if(student.password === password){
          res.cookie('student', student.id);
          res.send(true);
        }else{
          res.send(false);
        }
      }else{
        res.send(false);
      }
    }
  })
});

router.post('/teacher-login', function(req, res) {
  const email = req.body.email;
  const password = req.body.password;
  Teacher.findOne({email: email}, function (err, teacher) {
    if(err){console.log(err);}
    else{
      if(teacher){
        if(teacher.password === password){
          res.cookie('teacher', teacher.id);
          res.send(true);
        }else{
          res.send(false);
        }
      }else{
        res.send(false);
      }
    }
  })
});

router.post('/create-student', function(req, res) {
  const email = req.body.email;
  const password = req.body.password;
  const name = req.body.name;
  const newStudent = new Student({
    email: email,
    password: password,
    name: name
  });
  newStudent.save(function (err) {
    if(err){console.log(err); }
    else{
      res.send("successful inserted");
    }
  })
});

router.post('/create-teacher', function(req, res) {
  const email = req.body.email;
  const password = req.body.password;
  const name = req.body.name;
  const newTeacher = new Teacher({
    email: email,
    password: password,
    name: name
  });
  newTeacher.save(function (err) {
    if(err){console.log(err); }
    else{
      res.send("successful insert teacher");
    }
  })
});

router.get('/get-assignment', function(req, res) {
  AddAssignment.find({}, function (err, assignment) {
    if(err){
      console.log(err);
      res.send("false");
      return;
    }
    else{
      res.send(assignment);
    }
  })
});

router.post('/add-assignments', upload.single('file'), function(req, res) {  
  const data = JSON.parse(req.body.data);
  const newAssignment = new AddAssignment({
    pdf: req.file.filename,
    title: data.title,
    deadline: data.deadline
  });
  newAssignment.save(function (err, file) {
    if(err){console.log(err); }
  })
  res.send(false);
});

router.get('/get-submit-assignment', function (req, res) {
    SubmitAssignment.find({}, function (err, assignment) {
    if(err){
      console.log(err);
      res.send(false);
      return;
    }
    else{
      res.send(assignment);
    }
  })
});

router.post('/submit-assignments', upload.single('file'), function(req, res) {
  const data = JSON.parse(req.body.data);
  const newSubmitAssignment = new SubmitAssignment({    
    submit_pdf: req.file.filename,
    assignment_title: data.assignmentTitle,
    assignment_pdf: data.fileName,
    grade: "Not Evaluted"
  });
  newSubmitAssignment.save(function (err, file) {
    if(err){console.log(err); }
    else{
      console.log("successful insert assignment", file);
    }
  })
  AddAssignment.deleteOne({pdf: data.fileName}, function (err) {
    console.log(err);
  });
  res.send(false);
});

router.post('/submit-grade', function(req, res) {
  console.log(req.body);
  SubmitAssignment.updateOne({submit_pdf: req.body.fileName}, {grade: req.body.grade}, function (err, file) {
    if(err){
      console.log(err);return;
    }   
  })
});

router.post('/edit-student', function(req, res) {
  const student = req.cookies.student;
  const name = req.body.name;
  const password = req.body.password;
  if(name !== undefined){
    console.log("in name");
    Student.updateOne({_id: student}, {name: name}, function (err, file) {
      if(err){
        console.log(err);return;
      }   
    })
  }else{
    Student.findById(student, function(err, user) {
      if (err) {
        console.log(err);
        return;
      };
      user.password = password;
      user.save();
    });
  }  
  res.send(true);
});

router.post('/edit-teacher', function(req, res) {
  const teacher = req.cookies.teacher;
  const name = req.body.name;
  const password = req.body.password;
  if(name !== undefined){
    Teacher.updateOne({_id: teacher}, {name: name}, function (err, file) {
      if(err){
        console.log(err);return;
      }   
    })
  }else{
    Teacher.findById(teacher, function(err, user) {
      if (err) {
        console.log(err);
        return;
      };
      user.password = password;
      user.save();
    });
  }  
  res.send(true);
});

module.exports = router;