var Twitter = require('twitter');
var spotify = require('spotify');
var request = require('request');
// var keys = require('./keys.js');

var nodeArgs = process.argv;
var movieName = "";


// var client = new Twitter();
// client.twitterKeys;

// console.log(client);
// var userCommand = process.argv[2];

// if (userCommand == 'my-tweets') {
// 	var params = {screen_name: 'ShannonGreen4', count: 20};
// 	client.get('statuses/user_timeline', params, function(error, tweets, response) {
// 		for (var i = 0; i < tweets.length; i++) {
// 			console.log(tweets[i].created_at);
// 			console.log(tweets[i].text);
// 			console.log('\n--------------------------------\n');
// 		}
// 	});
// }


// spotify.search({ type: 'track', query: 'dancing in the moonlight' }, function(err, data) {
//     if ( err ) {
//         console.log('Error occurred: ' + err);
//         return;
//     }
// });

// Loop through all the words in the node argument
// And do a little for-loop magic to handle the inclusion of "+"s

console.log(process.argv[2])
if (process.argv[2] == null) {

	movieName = "Mr.+Nobody";

} else {
for (var i=2; i<nodeArgs.length; i++){

	if (i>2 && i< nodeArgs.length){

		movieName = movieName + "+" + nodeArgs[i];

	}

	else {

		movieName = movieName + nodeArgs[i];

	}
}

}
// Then run a request to the OMDB API with the movie specified 
var queryUrl = 'http://www.omdbapi.com/?t=' + movieName +'&y=&tomatoes=true&plot=short&r=json';

// This line is just to help us debug against the actual URL.  
console.log(queryUrl);

request(queryUrl, function (error, response, body) {

	// If the request is successful (i.e. if the response status code is 200)
	if (!error && response.statusCode == 200) {

		// Parse the body of the site and recover just the imdbRating
		// (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it). 
		console.log('\n--------------------------------\n');
		console.log("Title: " + JSON.parse(body)['Title']);
		console.log("Release Year: " + JSON.parse(body)['Year']);
		console.log("Rating: " + JSON.parse(body)['imdbRating']);
		console.log("Country: " + JSON.parse(body)['Country']);
		console.log("Language: " + JSON.parse(body)['Language']);
		console.log("Plot: " + JSON.parse(body)['Plot']);
		console.log("Actors: " + JSON.parse(body)['Actors']);
		console.log("Rotten Tomatoes Rating: " + JSON.parse(body)['tomatoUserRating']);
		console.log("Rotten Tomatoes URL: " + JSON.parse(body)['tomatoURL']);
		console.log('\n--------------------------------\n');
	}
});