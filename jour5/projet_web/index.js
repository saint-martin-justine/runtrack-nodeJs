const express = require('express');
const { MongoClient } = require('mongodb');
const path = require('path');

const app = express();
const port = 80;
const url = 'mongodb://localhost:27017';
const dbName = 'LaPlateforme';

app.use(express.static(path.join(__dirname, 'jour5', 'projet_web', 'public')));

app.use(express.json());

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.get('/about', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'about.html'));
});

app.get('/students-data', async (req, res) => {
  const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });
  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection('student');
    const studentsData = await collection.find({}).toArray();
    res.json(studentsData);
  } catch (error) {
    console.error('Une erreur s\'est produite lors de la récupération des données de la base de données :', error);
    res.status(500).json({ message: 'Erreur serveur' });
  } finally {
    client.close();
  }
});

app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, 'views', 'error404.html'));
});

app.listen(port, () => {
  console.log(`Le serveur écoute sur http://localhost:${port}`);
});
