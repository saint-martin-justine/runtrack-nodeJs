const fs = require('fs');

const filePath = 'data.txt';

try {
    const data = fs.readFileSync(filePath, 'utf8');
    console.log("Contenu du fichier data.txt :");
    console.log(data);
} catch (err) {
    console.error('Une erreur s\'est produite lors de la lecture du fichier :', err);
}
