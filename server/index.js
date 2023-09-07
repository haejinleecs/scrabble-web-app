import chalkAnimation from 'chalk-animation';
import { database } from './database.js';

// Import Morgan and Express
import express from "express";
import logger from "morgan";

// Create an Express app.
const app = express();
const port = process.env.PORT || 3000;

// Add middleware to the Express app.
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(logger('dev'));
app.use('/', express.static('client'));

// Implement the /wordScore endpoint
app.post('/wordScore', async function(req, res) {
  const data = req.body;
  if (!("name" in data && "word" in data && "score" in data)) {
    res.status(400).json({ error: "missing fields"})
  }
  try{
    await database.saveWordScore(data.name, data.word, data.score);  
    res.status(200).json({status: "success"});
  }
  catch (error) {
    res.status(500).json({error: "error"})
  }
});

// Implement the /highestWordScores endpoint
app.get('/highestWordScores', async function(req, res) {
  try{
    const response = await database.top10WordScores();  
    res.status(200).json(response);
  }
  catch (error) {
    res.status(500).json({error: "error"})
  }
});

// Implement the /gameScore endpoint
app.post('/gameScore', async function(req, res) {
  const data = req.body;
  if (!("name" in data && "score" in data)) {
    res.status(400).json({ error: "missing fields"})
  }
  try{
    await database.saveGameScore(data.name, data.score);  
    res.status(200).json({status: "success"});
  }
  catch (error) {
    res.status(500).json({error: "error"})
  }
  
});

// Implement the /highestGameScores endpoint
app.get('/highestGameScores', async function(req, res) {
  try{
    const response = await database.top10GameScores();  
    res.status(200).json(response);
  }
  catch (error) {
    res.status(500).json({error: "error"})
  }
});

// This matches all routes that are not defined.
app.all('*', async (request, response) => {
  response.status(404).send(`Not found: ${request.path}`);
});

// Start the server.
app.listen(port, () => {
  // This is totally just for fun!
  const banner = `
  .d8888b.                            888      888      888          
  d88P  Y88b                           888      888      888          
  Y88b.                                888      888      888          
   "Y888b.    .d8888b 888d888  8888b.  88888b.  88888b.  888  .d88b.  
      "Y88b. d88P"    888P"       "88b 888 "88b 888 "88b 888 d8P  Y8b 
        "888 888      888     .d888888 888  888 888  888 888 88888888 
  Y88b  d88P Y88b.    888     888  888 888 d88P 888 d88P 888 Y8b.     
   "Y8888P"   "Y8888P 888     "Y888888 88888P"  88888P"  888  "Y8888                                                                       
`;
  const msg = `${banner}\n     Server started on http://localhost:${port}`;
  const rainbow = chalkAnimation.rainbow(msg);

  // Have the rainbow stop so we can log stuff to the console.
  setTimeout(() => {
    rainbow.stop(); // Animation stops
  }, 2000);
});
