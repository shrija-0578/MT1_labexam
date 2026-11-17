const express = require("express");
const app = express();

app.use(express.json());

let students = [
  { id: 201, rollNumber: "CSE2401", name: "Aarav Sharma", branch: "CSE", semester: 3, email: "aarav@example.com" },
  { id: 202, rollNumber: "ECE2402", name: "Diya Verma", branch: "ECE", semester: 3, email: "diya@example.com" },
  { id: 203, rollNumber: "CSE2403", name: "Kabir Singh", branch: "CSE", semester: 3, email: "kabir@example.com" }
];

let nextId = 204;

function isValid(body) {
  return (
    typeof body.rollNumber === "string" && body.rollNumber !== "" &&
    typeof body.name === "string" && body.name !== "" &&
    typeof body.branch === "string" && body.branch !== "" &&
    typeof body.semester === "number" &&
    typeof body.email === "string" && body.email !== ""
  );
}

//GET all---->postman 1
app.get("/api/students", (req, res) => {
  res.status(200).json(students);
});


// GET by id ---->postman 3
app.get("/api/students/:id", (req, res) => {
  const student = students.find(s => s.id === Number(req.params.id));
  if (!student) {
    return res.status(404).json({ error: "Student not found" });
  }
  res.status(200).json(student);
});

// POST ---->postman 2
app.post("/api/students", (req, res) => {
  if (!isValid(req.body)) {
    return res.status(400).json({ error: "Invalid or missing fields" });
  }
  const newStudent = {
    id: nextId++,
    rollNumber: req.body.rollNumber,
    name: req.body.name,
    branch: req.body.branch,
    semester: req.body.semester,
    email: req.body.email
  };
  students.push(newStudent);
  res.status(201).json(newStudent);
});

// PUT ---->postman 4
app.put("/api/students/:id", (req, res) => {
  const student = students.find(s => s.id === Number(req.params.id));
  if (!student) {
    return res.status(404).json({ error: "Student not found" });
  }
  if (!isValid(req.body)) {
    return res.status(400).json({ error: "Invalid or missing fields" });
  }
  student.rollNumber = req.body.rollNumber;
  student.name = req.body.name;
  student.branch = req.body.branch;
  student.semester = req.body.semester;
  student.email = req.body.email;
  res.status(200).json(student);
});

// DELETE ---->postman 5
app.delete("/api/students/:id", (req, res) => {
  const index = students.findIndex(s => s.id === Number(req.params.id));
  if (index === -1) {
    return res.status(404).json({ error: "Student not found" });
  }
  students.splice(index, 1);
  res.status(200).json({ message: "Student deleted successfully" });
});

// Filter ---->postman 6
app.get("/api/students/filter", (req, res) => {
  const branch = (req.query.branch || "").toLowerCase();
  const result = students.filter(s => s.branch.toLowerCase() === branch);
  res.status(200).json(result);
});

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
