const pool = require("../../db");
const queries = require("./queries");

const getStudents = (req, res) => {
  pool.query(queries.getStudents, (error, results) => {
    if (error) throw error;
    res.status(200).json(results.rows);
  });
};

const getStudentById = (req, res) => {
  const id = parseInt(req.params.id);
  pool.query(queries.getStudentById, [id], (error, results) => {
    if (error) throw error;
    res.status(200).json(results.rows);
  });
};

const addStudent = (req, res) => {
  const { name, email, age, dob } = req.body;
  // check if the email exists already
  pool.query(queries.checkEmailExists, [email], (error, results) => {
    if (error) throw error;
    if (results.rows.length) {
      res.send("Email already exists.");
      return;
    }
    // add student to db
    pool.query(
      queries.addStudent,
      [name, email, age, dob],
      (error, results) => {
        if (error) throw error;
        res.status(201).send("Student created successfully");
        // console.log("Student created");
      }
    );
  });
};

const removeStudent = (req, res) => {
  const id = parseInt(req.params.id);
  // check if student exists
  pool.query(queries.getStudentById, [id], (error, results) => {
    if (error) throw error;
    const noStudentFound = !results.rows.length;
    if (noStudentFound) {
      res.send("Does not exist in database.");
      return;
    }
    pool.query(queries.removeStudent, [id], (error, results) => {
      if (error) throw error;
      res.status(200).send("Student removed successfully!");
    });
  });
};

const updateStudent = (req, res) => {
  const id = parseInt(req.params.id);
  let { name, email, age, dob } = req.body;
  pool.query(queries.getStudentById, [id], (error, results) => {
    if (error) throw error;
    const noStudentFound = !results.rows.length;
    if (noStudentFound) {
      res.send("Does not exist!");
      return;
    }
    const student = results.rows[0];
    if (!name) name = student.name;
    if (!email) email = student.email;
    if (!age) age = student.age;
    if (!dob) dob = student.dob;

    pool.query(
      queries.updateStudent,
      [name, email, age, dob, id],
      (error, results) => {
        if (error) throw error;
        res.status(200).send("updated successfully!");
      }
    );
  });
};

module.exports = {
  getStudents,
  getStudentById,
  addStudent,
  updateStudent,
  removeStudent,
};
