import express from 'express';
import { getPuzzleJSON } from './AStar/AStar'; 

export const app = express();
 
app.get('/', (request, response) => {
    response.status(200).send('Send a puzzle pls!');
});
 
// microservice path
app.get('/:puzzle', (request, response) => {
  // We can access the path parameters here:
  const puzzle = request.params.puzzle;
  console.log('puzzle');
  console.log(puzzle);
  response.json(getPuzzleJSON(puzzle));
});

