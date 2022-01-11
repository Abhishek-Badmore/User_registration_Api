const express = require("express");
const dotenv = require("dotenv");
const app = express();
const port = process.env.PORT || 8000;
const Student = require("./models/students");

dotenv.config({ path: "./config.env" });
require("./db/conn");

// app.get("/students", (req, res) => {
//   res.send("hello from the students side");
// });

app.use(express.json());

// app.post("/students", (req, res) => {
//   console.log(req.body);
//   const user = new Student(req.body);
//   console.log(`This is users now ${user}`); //Here we get all the student data
//   user
//     .save()
//     .then(() => {
//       res.status(201).send(user);
//     })
//     .catch((err) => {
//       res.status(400).send(err);
//     });
// });

// Creating API using Async Await
//POST(Get data from User)
app.post("/students", async (req, res) => {
  try {
    const user = new Student(req.body);
    const createUser = await user.save();
    res.status(201).send(createUser);
  } catch (err) {
    res.status(400).send(err);
  }
});

app.get("/students", async (req, res) => {
  try {
    const studentData = await Student.find(); //Here .find() method is to fetchData from database

    res.send(studentData);
  } catch (err) {
    res.status(500).send(err);
  }
});

//This code is to get individual student data using :id
//GET (Read Data from the user)
app.get("/students/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const studentData = await Student.findById(_id);

    if (!studentData) {
      return res.status(404).send();
    } else {
      res.send(studentData);
    }
  } catch (err) {
    res.status(500).send(err);
  }
});

//Update the student by its :id
//PATCH(UPDATE the user)

app.patch("/students/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const updateStudent = await Student.findByIdAndUpdate(_id, req.body, {
      new: true,
    });
    res.send(updateStudent);
  } catch (err) {
    res.status(400).send(err);
  }
});

//Delete the students data using delete

app.delete("/students/:id", async (req, res) => {
  try {
    const deleteStudent = await Student.findByIdAndDelete(req.params.id);
    if (!req.params.id) {
      return res.status(400).send();
    } else {
      res.send(deleteStudent);
    }
  } catch (err) {
    res.status(500).send(err);
  }
});

app.listen(port, () => {
  console.log(`connection successful at PORTno ${port}`);
});
