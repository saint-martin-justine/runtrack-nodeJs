const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/LaPlateforme', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('Connexion à la base de données réussie'))
.catch(err => console.error('Erreur de connexion à la base de données :', err));

module.exports = mongoose;
