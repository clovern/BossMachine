const express = require('express');
const minionsRouter = express.Router();


const { 
    addToDatabase, getAllFromDatabase, getFromDatabaseById, updateInstanceInDatabase, deleteFromDatabasebyId, 
    getFromDatabaseByMinionId, updateWorkInDatabase, deleteWorkFromDatabasebyId} = require('./db');

minionsRouter.get('/', (req, res, next) => {
    const minionsData = getAllFromDatabase('minions');
    if (minionsData){
        res.send(minionsData);
    }
    else{
        res.status(402).send("Could not GET all minions from database");
    }
});

minionsRouter.get('/:minionId', (req, res, next) => {
    const minionData = getFromDatabaseById('minions', req.params.minionId);
    if (minionData){
        res.send(minionData);
    }
    else{
        res.status(404).send(`could not GET minion with ${req.params.minionId}`);
    }
});


minionsRouter.post('/', (req, res, next) => {
    const newMinion = addToDatabase('minions', req.body);
    if (newMinion){
        res.status(201).send(newMinion);
    }
    else{
        res.status(400).send("Could not POST new minion"); 
    }
});

minionsRouter.put('/:minionId', (req, res, next) => {
    const updatedMinion = updateInstanceInDatabase('minions', req.body)
    if (updatedMinion){
        res.send(updatedMinion);
    }
    else{
        res.status(404).send(`could not update minion with minionId ${req.params.minionId}`);
    }
});

minionsRouter.delete('/:minionId', (req, res, next) => {
    const deleteSuccessful = deleteFromDatabasebyId('minions', req.params.minionId)
    if (deleteSuccessful){
        res.status(204).send(`could not delete minion with ${req.params.minionId}`);
    }
    else{
        res.status(404).send();
    }
});

minionsRouter.get('/:minionId/work', (req, res, next) => {
    const minionWorkData = getFromDatabaseByMinionId('work', req.params.minionId);
    if (minionWorkData){
        res.send(minionWorkData);
    }
    else{
        res.status(404).send(`could not GET work for minion with minionId ${req.params.minionId}`);
    }
});

minionsRouter.post('/:minionId/work', (req, res, next) => {
    const newWork = addToDatabase('work', req.body);
    if (newWork){
        res.status(201).send(newWork);
    }
    else{
        res.status(400).send(`could not POST work for minion with minionId ${req.params.minionId}`); 
    }

});

minionsRouter.put('/:minionId/work/:workId', (req, res, next) => {
    const updatedWork = updateWorkInDatabase('work', req.body)
    if (updatedWork){
        res.send(updatedWork);
    }
    else{
        res.status(404).send(`could not update work for minion with minionId ${req.params.minionId} and work id ${req.params.workId}`);
    }
});

minionsRouter.delete('/:minionId/work/:workId', (req, res, next) => {
    const deleteSuccessful = deleteWorkFromDatabasebyId('work', req.params.minionId, req.params.workId);
    if (deleteSuccessful){
        res.status(204).send();
    }
    else{
        res.status(404).send(`could not delete work for minion with minionId ${req.params.minionId} and work id ${req.params.workId}`);
    }
});

module.exports = minionsRouter;