const fs = require('fs');

fs.readFile('data.txt', 'utf8', (err, data) => {
  if (err) {
    console.error("Erreur lors de la lecture du fichier :", err);
    return;
  }

  let letters = '';
  for (let i = 0; i < data.length; i += 2) {
    letters += data[i];
  }

  console.log(letters);
});
