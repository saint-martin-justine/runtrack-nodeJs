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

rl.question('Enter student ID to delete: ', (studentId) => {
    Student.deleteOne({ _id: studentId })
      .then(result => {
        if (result.deletedCount === 1) {
          console.log('Student deleted');
        } else {
          console.log('Student not found');
        }
      })
      .catch(err => {
        console.error(err);
      })
      .finally(() => {
        rl.close();
      });
  });
  