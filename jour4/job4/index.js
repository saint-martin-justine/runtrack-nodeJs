const { MongoClient, ObjectId } = require('mongodb');

async function main() {
    const uri = "mongodb://localhost:27017";

    const client = new MongoClient(uri);

    try {
        await client.connect();

        const database = client.db('LaPlateforme');

        const yearCollection = database.collection('year');
        await yearCollection.insertMany([
            { year: "Bachelor 1" },
            { year: "Bachelor 2" },
            { year: "Bachelor 3" }
        ]);

        const years = await yearCollection.find().toArray();
        console.log('Years:', years);

        const studentCollection = database.collection('student');
        await studentCollection.insertMany([
            {
                lastname: "LeBricoleur",
                firstname: "Bob",
                students_number: "123",
                year_id: years[0]._id
            },
            {
                lastname: "Doe",
                firstname: "John",
                students_number: "456",
                year_id: years[1]._id
            },
            {
                lastname: "Dupont",
                firstname: "Marine",
                students_number: "789",
                year_id: years[2]._id
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
