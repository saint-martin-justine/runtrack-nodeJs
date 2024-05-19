const readline = require('readline');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/LaPlateforme')
  .then(() => console.log('Connecté à MongoDB...'))
  .catch(err => console.error('Impossible de se connecter à MongoDB...', err));

const studentSchema = new mongoose.Schema({
  id: Number,
  lastname: String,
  firstname: String,
  students_number: Number,
  year_id: { type: mongoose.Schema.Types.ObjectId, ref: 'year' }
});

const Student = mongoose.model('Student', studentSchema, 'student');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Entrez l\'identifiant de l\'étudiant à mettre à jour : ', (studentId) => {
  rl.question('Entrez le nouvel identifiant du cursus : ', (newYearId) => {
    // Mettre à jour l'étudiant en utilisant son identifiant
    Student.findByIdAndUpdate(studentId, { year_id: newYearId }, { new: true })
      .then(updatedStudent => {
        if (updatedStudent) {
          console.log('Étudiant mis à jour avec succès :', updatedStudent);
        } else {
          console.log('Aucun étudiant trouvé avec cet identifiant.');
        }
        rl.close();
      })
      .catch(err => {
        console.error('Erreur lors de la mise à jour de l\'étudiant :', err);
        rl.close();
      });
  });
});
