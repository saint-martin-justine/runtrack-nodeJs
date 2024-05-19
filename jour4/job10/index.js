const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/LaPlateforme')
  .then(() => {
    console.log('Connection to MongoDB...');

    const validStudent = new Student({
      id: 1,
      lastname: 'Doe',
      firstname: 'John',
      students_number: 12345,
      year_id: new mongoose.Types.ObjectId()
    });

    validStudent.save()
      .then(() => console.log('Valid student data inserted successfully.'))
      .catch(err => console.error('Error inserting valid student data:', err));

    const invalidStudent = new Student({
      lastname: 'Smith',
      firstname: 'Alice',
      students_number: 54321,
      year_id: new mongoose.Types.ObjectId()
    });

    invalidStudent.save()
      .then(() => console.log('Invalid student data inserted successfully (which should not happen).'))
      .catch(err => console.error('Expected error inserting invalid student data:', err));
  })
  .catch(err => console.error('Could not connect to MongoDB...', err));

const studentSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  lastname: { type: String, required: true },
  firstname: { type: String, required: true },
  students_number: { type: Number, required: true },
  year_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Year', required: true }
});

const Student = mongoose.model('Student', studentSchema, 'student');
