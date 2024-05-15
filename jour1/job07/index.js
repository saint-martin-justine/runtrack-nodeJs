const fs = require('fs');

async function FichierAsync() {
  try {
    const contenu = await fs.promises.readFile('data.txt', 'utf-8');

    console.log(contenu);
  } catch (erreur) {
    console.error("Erreur lors de la lecture du fichier :", erreur);
  }
}

FichierAsync();
