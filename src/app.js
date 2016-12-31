import express from 'express';
import { getPuzzleJSON } from './AStar'; 
var url = require('url');

export const app = express();
 
app.get('/api/v1/puzzle/', (request, response) => {
  const puzzleParam = url.parse(request.url, true).query.p; 
  if (!puzzleParam) {
    response.status(200).send('Send a puzzle pls!');
  } else {
    response.json(getPuzzleJSON(puzzleParam));
  }
});
 
// // microservice path
// app.get('/:puzzle', (request, response) => {
//   const puzzle = request.params.puzzle;

// });

