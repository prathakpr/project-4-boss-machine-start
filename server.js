const express = require('express');
const app = express();


module.exports = app;

/* Do not change the following line! It is required for testing and allowing
*  the frontend application to interact as planned with the api server
*/
const PORT = process.env.PORT || 4001;

// Add middleware for handling CORS requests from index.html
const cors = require(cors());
app.use(cors());

// Add middware for parsing request bodies here:

app.use((req, res, next)=>{
  res.send('request accepted');
  next();
})

// for /api/minions

app.param('minionId', (req, res, next, id)=>{
  req.minionId = req.params.minionId;
  next();
})

app.get('/api/minions', (req, res, next)=>{
  res.status(200).send(findDataArrayByName(minions));
  next();
});

app.post('/api/minions', (req, res, next)=>{
  const newMinion = createMinion();
  addToDatabase(minions, newMinion);
})

app.get(' /api/minions/:minionId', (req, res, next)=>{
  res.status(200).send(getFromDatabaseById(minions, req.minionId));
})

app.put('/api/minions/:minionId', (req, res, next)=>{
  updateInstanceInDatabase(minions, req.minionId);
})

app.delete('/api/minions/:minionId', (req, res, next)=>{
  deleteFromDatabasebyId(minions, req.minionId);
})

// for /api/ideas

app.param('ideaId', (req, res, next)=>{
  req.ideaId = req.params.ideaId;
  next();
})

app.get('/api/ideas', (req, res, next)=>{
  res.status(200).send(findDataArrayByName(ideas));
  next();
})

app.post('/api/ideas', (req, res, next)=>{
  const newIdea = createIdea();
  addToDatabase(ideas, newIdea);
})

app.get('/api/ideas/:ideaId', (req, res, next)=>{
  res.status(200).send(getFromDatabaseById(ideas, req.ideaId));
  next();
})

app.put('/api/ideas/:ideaId', (req, res, next)=>{
  updateInstanceInDatabase(minions, req.minionId);
})

app.delete('/api/ideas/:ideaId', (req, res, next)=>{
  deleteFromDatabasebyId(ideas, req.ideaId);
})

//for meetings

app.get('/api/meetings', (req, res, next)=>{
  res.status(200).send(findDataArrayByName(meetings));
})

app.post('/api/meetings', (req, res, next)=>{
  const newMeeting = createMeeting();
  addToDatabase(meetings, newMeeting);
})

app.delete('/api/meetings', (req, res, next)=>{
  deleteAllFromDatabase(meetings);
})

// Mount your existing apiRouter below at the '/api' path.
const apiRouter = require('./server/api');
const { addToDatabase } = require('./server/db');


// This conditional is here for testing purposes:
if (!module.parent) { 
  // Add your code to start the server listening at PORT below:
  app.listen(PORT, ()=>{
    console.log(`Server listening on port ${PORT}`);
  })
}
