import express from 'express';
import { getPuzzleJSON } from './AStar'; 

export const app = express();
 
app.get('/', (request, response) => {
    response.status(200).send('Send a puzzle pls!');
});
 
// microservice path
app.get('/:puzzle', (request, response) => {
  const puzzle = request.params.puzzle;
  response.json(getPuzzleJSON(puzzle));
});

