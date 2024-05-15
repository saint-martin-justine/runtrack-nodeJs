const fs = require('fs');

const filePath = 'data.txt';

const newContent = "Je suis à l'école LaPlateforme";

fs.writeFile(filePath, newContent, (err) => {
  if (err) {
    console.error("Erreur lors de l'écriture dans le fichier :", err);
    return;
  }
  console.log("Le contenu du fichier a été modifié avec succès !");
});
