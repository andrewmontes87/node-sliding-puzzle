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


// FOR NOW DO A TIMESTAMP
function getPuzzleJSON(puzzle) {
	// First, we handle the unix timestamps. Path parameters come in as text
	// rather than numbers, so we'll attempt to parse them.
	var result = {
		unix: null,
		natural: null
	};
 
	var date;
	if (!isNaN(parseInt(timestamp))) {
		// This means that the parsed integer is NOT a
		// NaN (not a number) value, in other words: it's a valid number.
		date = new Date(parseInt(timestamp));
	} else {
		// Timestamp is not a valid number, we'll create a Date object
		// and then check if is valid before we return it
		date = new Date(timestamp);
	}
 
	if (!isNaN(date.getTime())) {
		// Date.getTime() returns the unix timestamp,
		// if it where an invalid date, this would be NaN
		result.unix = date.getTime();
		result.natural = getNaturalDate(date);
	}
 
	// We return the value, whatever it may be.
	return result;	
}

// HELPER TRANSFORMATION FUNCTION
function getNaturalDate(date) {
	var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'Obtober', 'November', 'December'];
 
	return months[date.getMonth()] + ' ' + date.getDate() + ', ' + date.getFullYear();
}