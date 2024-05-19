const { MongoClient } = require('mongodb');

async function main() {
    const uri = "mongodb://localhost:27017";

    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

    try {
        await client.connect();
        const database = client.db('LaPlateforme');
        const collections = await database.listCollections().toArray();
        console.log('Collections in LaPlateforme:', collections);
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}

main().catch(console.error);
