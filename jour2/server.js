
const express = require('express');
const routes = require('./route.js');

function createServer() {
  const app = express();

  app.use(express.json());
  app.use('/api', routes);

  return app;
}

function startServer(port) {
  const app = createServer();
  app.listen(port, (err) => {
    if (err) {
      console.error('Erreur lors du démarrage du serveur :', err);
    } else {
      console.log(`Serveur en cours d'exécution sur le port ${port}`);
    }
  });
}

module.exports = { createServer, startServer };


module.exports = { createServer, startServer };