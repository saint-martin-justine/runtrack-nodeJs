const readline = require('readline');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/LaPlateforme')
  .then(() => console.log('Connection to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

const studentSchema = new mongoose.Schema({
  id: Number,
  lastname: String,
  firstname: String,
  students_number: Number,
  year_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Year' }
});

const Student = mongoose.model('Student', studentSchema, 'student');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Enter last name to search: ', (lastname) => {
  Student.find({ lastname })
    .then(students => {
      students.forEach(student => {
        console.log("ID:", student.id);
        console.log("Last Name:", student.lastname);
        console.log("First Name:", student.firstname);
        console.log("Student Number:", student.students_number);
        console.log("Year ID:", student.year_id);
        console.log("\n");
      });
      if (students.length === 0) {
        console.log("No student found with the last name:", lastname);
      }
    })
    .catch(err => {
      console.error(err);
    })
    .finally(() => {
      rl.close();
    });
});

