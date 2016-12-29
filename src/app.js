import express from 'express';
 
export const app = express();
 
 
// microservice path
app.get('/:puzzle', (request, response) => {
  // We can access the path parameters here:
  const puzzle = request.params.puzzle;
  console.log('puzzle');
  console.log(puzzle);
  response.json(getPuzzleJSON(puzzle));
});


function reverseString(str) {
  if (str === "")
    return "";
  else
    return reverseString(str.substr(1)) + str.charAt(0);
}

function getPuzzleJSON(puzzle) {
  let result =  '';
  result = reverseString(puzzle);

  return result;  
}

