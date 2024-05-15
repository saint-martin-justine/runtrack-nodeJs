const { startServer } = require('./server');

const PORT = process.env.PORT || 8888;

const server = startServer(PORT);


if (server) {
  
  server.use('/api', require('./route.js')); 
} else {
  console.error('Erreur lors du démarrage du serveur.');
}