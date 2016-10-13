var Twitter = require('twitter');
var keys = require('./keys.js')

var client = new Twitter();
client.twitterKeys;

console.log(client);
var userCommand = process.argv[2];

if (userCommand == 'my-tweets') {
	var params = {screen_name: 'ShannonGreen4', count: 20};
	client.get('statuses/user_timeline', params, function(error, tweets, response) {
		for (var i = 0; i < tweets.length; i++) {
			console.log(tweets[i].created_at);
			console.log(tweets[i].text);
			console.log('\n--------------------------------\n');
		}
	});
}

// // Include the request npm package (Don't forget to run "npm install request" in this folder first!)
// var request = require('request');

// // Then run a request to the OMDB API with the movie specified
// request('http://www.omdbapi.com/?t=remember+the+titans&y=&plot=short&r=json', function (error, response, body) {

// 	// If the request is successful (i.e. if the response status code is 200)
// 	if (!error && response.statusCode == 200) {

// 		// Parse the body of the site and recover just the imdbRating
// 		// (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it). 
// 		console.log("The movie's rating is: " + JSON.parse(body)["imdbRating"])
// 	}
// });