const { MongoClient } = require('mongodb');

async function main() {
    
    const uri = "mongodb://localhost:27017";
    const client = new MongoClient(uri);

    try {
        await client.connect();

        const database = client.db('LaPlateforme');

        const studentCollection = database.collection('student');
        await studentCollection.insertMany([
            {
                lastname: "LeBricoleur",
                firstname: "Bob",
                students_number: "123",
                year_id: 1
            },
            {
                lastname: "Doe",
                firstname: "John",
                students_number: "456",
                year_id: 1
            },
            {
                lastname: "Dupont",
                firstname: "Marine",
                students_number: "789",
                year_id: 1
            }
        ]);

        const students = await studentCollection.find().toArray();
        console.log('Students:', students);

    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}

main().catch(console.error);
