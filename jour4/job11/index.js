const mongoose = require('mongoose');
const fs = require('fs');

mongoose.connect('mongodb://localhost:27017/LaPlateforme')
  .then(() => console.log('Connection to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

const yearSchema = new mongoose.Schema({
  year: String
});

const Year = mongoose.model('Year', yearSchema);

const studentSchema = new mongoose.Schema({
  id: Number,
  lastname: String,
  firstname: String,
  students_number: Number,
  year_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Year' }
});

const Student = mongoose.model('Student', studentSchema, 'student');

async function exportData() {
  try {
    const students = await Student.find().populate('year_id').exec();
    console.log('Fetched students:', students);

    if (students.length === 0) {
      console.log('Aucun étudiant trouvé.');
      return;
    }

    fs.writeFile('studentsLaPlateforme.json', JSON.stringify(students, null, 2), (err) => {
      if (err) {
        console.error('Erreur lors de lécriture dans le fichier :', err);
      } else {
        console.log('fichier exporté en students.json');
      }
    });
  } catch (err) {
    console.error('Erreur lors de la récupération des étudiants :', err);
  } finally {
    mongoose.connection.close();
  }
}

exportData();