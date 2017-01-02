import express from 'express';
import cors from 'cors';
import { getPuzzleJSON } from './AStar'; 
import url from 'url';

export const app = express();
 
app.get('/api/v1/puzzle', cors(),(request, response) => {
  const puzzleParam = url.parse(request.url, true).query.p; 
  if (!puzzleParam) {
    response.status(200).send('Send a puzzle pls!');
  } else {
    response.json(getPuzzleJSON(puzzleParam));
  }
});
