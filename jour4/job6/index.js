const readline = require('readline');
const { MongoClient } = require('mongodb');

const url = 'mongodb://localhost:27017';
const dbName = 'LaPlateforme';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

async function connectAndQuery() {
  const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });
  try {
    await client.connect();
    console.log('Connecté à MongoDB...');
    
    const db = client.db(dbName);
    const collection = db.collection('student');

    async function findStudentByNumberGreaterThan(collection, studentNumber) {
      try {
        const students = await collection.find({ students_number: { $gt: studentNumber } }).toArray();
        return students;
      } catch (error) {
        console.error('Une erreur s\'est produite lors de la recherche des étudiants :', error);
        throw error;
      }
    }

    rl.question('Entrez le numéro d\'étudiant pour filtrer : ', async (studentNumber) => {
      try {
        const students = await findStudentByNumberGreaterThan(collection, studentNumber);
        if (students.length > 0) {
          console.log('Autres étudiants trouvés :');
          students.forEach(student => {
            console.log(`${student.firstname} ${student.lastname}`);
          });
        } else {
          console.log('Aucun autre étudiant trouvé.');
        }
      } catch (error) {
        console.error('Une erreur s\'est produite lors de la recherche des étudiants :', error);
      } finally {
        rl.close();
        client.close();
      }
    });

  } catch (err) {
    console.error('Impossible de se connecter à MongoDB...', err);
  }
}

connectAndQuery();
