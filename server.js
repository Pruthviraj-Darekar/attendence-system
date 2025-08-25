const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

// Connect MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.error(err));

// Sample Schema
const StudentSchema = new mongoose.Schema({
    studentId: String,
    name: String,
    attendance: Number,
});

const Student = mongoose.model("Student", StudentSchema);

// Routes
app.get("/", (req, res) => {
    res.send("Backend running...");
});

app.get("/students", async (req, res) => {
    const students = await Student.find();
    res.json(students);
});

app.post("/students", async (req, res) => {
    const student = new Student(req.body);
    await student.save();
    res.json(student);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
