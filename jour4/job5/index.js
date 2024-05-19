const { MongoClient } = require('mongodb');

const url = 'mongodb://localhost:27017/LaPlateforme';

async function fetchStudentsWithYears() {
    let client;
    try {
        client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });
        await client.connect();
        console.log('Connecté à la base de données MongoDB');

        const db = client.db();

        const studentsWithYears = await db.collection('student').aggregate([
            {
                $lookup: {
                    from: 'year',
                    localField: 'year_id',
                    foreignField: '_id',
                    as: 'year'
                }
            },
            {
                $unwind: '$year' // Pour dérouler le tableau d'année
            },
            {
                $project: {
                    _id: 0, // Exclure l'ID du résultat final
                    lastname: 1,
                    firstname: 1,
                    students_number: 1,
                    year: '$year.year' // Récupérer uniquement le champ 'year' de la collection 'year'
                }
            }
        ]).toArray();

        console.log('Étudiants avec leurs cursus :');
        console.log(studentsWithYears);
    } catch (error) {
        console.error('Erreur lors de la récupération des étudiants avec leurs cursus :', error);
    } finally {
        if (client) {
            await client.close();
            console.log('Déconnecté de la base de données MongoDB');
        }
    }
}

fetchStudentsWithYears();
