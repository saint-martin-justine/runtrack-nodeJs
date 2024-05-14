const path = require('path');

const cheminFichier = __filename;

const nomFichier = path.basename(cheminFichier);
console.log("Nom du fichier:", nomFichier);

const extensionFichier = path.extname(cheminFichier);
console.log("Extension du fichier:", extensionFichier);

const repertoireParent = path.dirname(cheminFichier);
console.log("Répertoire parent du fichier:", repertoireParent);
