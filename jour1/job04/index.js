const fs = require('fs');
const path = require('path');

const parentDirectory = path.resolve('..');

function listDirectories(directory) {
  const files = fs.readdirSync(directory);

  const directories = files.filter(file => fs.statSync(path.join(directory, file)).isDirectory());

  return directories;
}

const parentDirectories = listDirectories(parentDirectory);

console.log('Dossiers dans le répertoire courant :');
parentDirectories.forEach(directory => console.log(directory));
