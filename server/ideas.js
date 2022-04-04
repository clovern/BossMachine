const express = require('express');
const ideasRouter = express.Router();

module.exports = ideasRouter;

const { addToDatabase, getAllFromDatabase, getFromDatabaseById, updateInstanceInDatabase, deleteFromDatabasebyId} = require('./db');

ideasRouter.get('/', (req, res, next) => {
    const ideasData = getAllFromDatabase('ideas');
    if (ideasData){
        res.send(ideasData);
    }
    else{
        res.status(402).send("could not GET ideas data from database");
    }
});

ideasRouter.get('/:ideaId', (req, res, next) => {
    const ideaData = getFromDatabaseById('ideas', req.params.ideaId);
    if (ideaData){
        res.send(ideaData);
    }
    else{
        res.status(404).send(`could not GET idea with ideaId ${req.params.ideaId}`);
    }
});


ideasRouter.post('/', (req, res, next) =>{
    const newidea = addToDatabase('ideas', req.body);
    if (newidea){
        res.status(201).send(newidea);
    }
    else{
        res.status(400).send("request to POST new idea failed"); 
    }
});

ideasRouter.put('/:ideaId', (req, res, next) => {
    const updatedIdea = updateInstanceInDatabase('ideas', req.body)
    if (updatedIdea){
        res.send(updatedIdea);
    }
    else{
        res.status(404).send(`could not update (PUT) work for idea with ideaId ${req.params.ideaId}`);
    }
});

ideasRouter.delete('/:ideaId', (req, res, next) => {
    const deleteSuccessful = deleteFromDatabasebyId('ideas', req.params.ideaId)
    if (deleteSuccessful){
        res.status(204).send();
    }
    else{
        res.status(404).send(`could not DELETE idea with ideaId ${req.params.ideaId}`);
    }
});