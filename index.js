var express = require('express'); // We import ExpressJS
 
var app = express(); // This is how we initialize an express app
var PORT = process.env.PORT || 3000;     // We set the port that the application will use
 
// When a GET request is made to the root path: '/' reply with Hello World
// app.get('/', function(request, response) {
//   response.send('Hello World');
// });
 
// microservice path
app.get('/:puzzle', function(request, response) {
  // We can access the path parameters here:
  var puzzle = request.params.puzzle;
  console.log('puzzle');
  console.log(puzzle);
  response.json(getPuzzleJSON(puzzle));
});


// We set the app to listen on the given PORT
// It will log a message to the console once it is ready
app.listen(PORT, function() {
  console.log('Server is listening on port ' + PORT);
});


function reverseString(str) {
  if (str === "")
    return "";
  else
    return reverseString(str.substr(1)) + str.charAt(0);
}

function getPuzzleJSON(puzzle) {
  var result =  '';
  result = reverseString(puzzle);

  return result;  
}



