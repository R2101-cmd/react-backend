const express=require("express");
const mongoose=require("mongoose");
const cors=require("cors");

const app=express();//create express application for app

app.use(cors());
app.use(express.json());//converts i/p to json


// DB connection
mongoose.connect("mongodb://localhost:27017/")
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));


const StudentSchema = new mongoose.Schema({
  name: String,
  course: String
});

const Student = mongoose.model("Student", StudentSchema);

// CREATE
app.post("/add", async (req, res) => {
  const student = new Student(req.body);
  await student.save();
  res.send("Student Added");
});

// READ
app.get("/students", async (req, res) => {
  const data = await Student.find();
  res.json(data);
});

// DELETE
app.delete("/delete/:id", async (req, res) => {
  await Student.findByIdAndDelete(req.params.id);
  res.send("Student Deleted");
});

// server start
app.listen(5000, () => {
  console.log("Backend running on port 5000");
});
