const express = require('express');
const routes = express.Router(); 
const fs = require('fs');
const data = require('./data.json');


routes.get('/tasks', (req, res) => {
  res.json(data);
});


routes.post('/tasks', (req, res) => {
  const newTask = req.body;
 
  const newId = data.length > 0 ? data[data.length - 1].id + 1 : 1;
  newTask.id = newId;
 
  data.push(newTask);
 
  fs.writeFile('./data.json', JSON.stringify(data, null, 2), (err) => {
    if (err) {
      res.status(500).json({ error: 'Erreur lors de l\'écriture des données.' });
    } else {
      res.status(201).json(newTask);
    }
  });
});


routes.put('/tasks/:id', (req, res) => {
  const taskId = req.params.id;
  const updatedTaskData = req.body;
  
  const taskToUpdate = data.find(task => task.id == taskId);
  if (!taskToUpdate) {
    return res.status(404).json({ error: 'Tâche non trouvée.' });
  }
  
  Object.assign(taskToUpdate, updatedTaskData);
  
  fs.writeFile('./data.json', JSON.stringify(data, null, 2), (err) => {
    if (err) {
      res.status(500).json({ error: 'Erreur lors de l\'écriture des données.' });
    } else {
      res.status(200).json(taskToUpdate);
    }
  });
});


routes.delete('/tasks/:id', (req, res) => {
  const taskId = req.params.id;
  
  const taskIndex = data.findIndex(task => task.id == taskId);
  if (taskIndex === -1) {
    return res.status(404).json({ error: 'Tâche non trouvée.' });
  }
 
  data.splice(taskIndex, 1);
 
  fs.writeFile('./data.json', JSON.stringify(data, null, 2), (err) => {
    if (err) {
      res.status(500).json({ error: 'Erreur lors de l\'écriture des données.' });
    } else {
      res.status(200).json({ message: 'Tâche supprimée avec succès.' });
    }
  });
});

module.exports = routes; 


