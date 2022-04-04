const express = require('express');
const meetingsRouter = express.Router();

module.exports = meetingsRouter;

const {addToDatabase, getAllFromDatabase, deleteAllFromDatabase, createMeeting} = require('./db');

meetingsRouter.get('/', (req, res, next) => {
  const meetingsData = getAllFromDatabase('meetings');
  if (meetingsData){
      res.send(meetingsData);
  }
  else{
      res.status(402).send("request to GET all meetings failed");
  }
});


meetingsRouter.post('/', (req, res, next) => {
  let newMeeting = createMeeting();
  const addMeeting = addToDatabase('meetings', newMeeting);
  if (addMeeting){
      res.status(201).send(addMeeting);
  }
  else{
      res.status(400).send("request to POST new meeting failed"); 
  }
});

meetingsRouter.delete('/', (req, res, next) => {
  deleteAllFromDatabase('meetings');
  res.status(204).send("request to DELETE all meetings failed");
});
