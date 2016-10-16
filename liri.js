var Twitter = require('twitter');
var spotify = require('spotify');
var request = require('request');
var fs = require('fs');
var keys = require('./keys.js');

var twitterKey = keys.twitterKeys;
var nodeArgs = process.argv;
var movieName = "";
var songName = "";

var client = new Twitter({
		consumer_key: twitterKey.consumer_key,
  	consumer_secret: twitterKey.consumer_secret,
  	access_token_key: twitterKey.access_token_key,
  	access_token_secret: twitterKey.access_token_secret
});

// responsible for getting tweets and date created from the twitter api
var myTwitter = function() {
	var params = {screen_name: 'ShannonGreen4', count: 20};
	client.get('statuses/user_timeline', params, function(error, tweets, response) {
		for (var i = 0; i < tweets.length; i++) {
			console.log(tweets[i].created_at);
			console.log(tweets[i].text);
			console.log('\n--------------------------------\n');
		}
	});
}

// checks to see if the information being passed in is a single word or multiple words. If multiple words then makes it into a form that is easily understood by the api.
var mySpotify = function() {

	for (var i=3; i<nodeArgs.length; i++){

		if (i>3 && i< nodeArgs.length){

			songName += "+" + nodeArgs[i];

		} else {

			songName += nodeArgs[i];

		}
	}
// for query: || is used to set a default song name if no song is entered by the user
	spotify.search({ type: 'track', query: songName || 'Ace of Base - The Sign' }, function(err, data) {
	    if ( err ) {
	        console.log('Error occurred: ' + err);
	        return;
	    }
	        var artist = data.tracks.items[0].artists[0].name;
			var song = data.tracks.items[0].name;
	        var previewURL = data.tracks.items[0].preview_url;
	        var album = data.tracks.items[0].album.name;

			console.log('\n--------------------------------\n');
			console.log("Artist: " + artist);
			console.log("Song name: " + song);
			console.log("Preview URL: " + previewURL);
			console.log("Album: " + album);
			console.log('\n--------------------------------\n');
	});
}


// checks to see if the information being passed in is a single word or multiple words. If multiple words then makes it into a form that is easily understood by the api.
var myMovie = function() {
	if (process.argv[3] == null) {

		movieName = "Mr.+Nobody";

	} else {
		for (var i=3; i<nodeArgs.length; i++){

			if (i>3 && i< nodeArgs.length){

				movieName += "+" + nodeArgs[i];

			} else {

				movieName += nodeArgs[i];

			}
		}
	}

// Then run a request to the OMDB API with the movie specified 
	var queryUrl = 'http://www.omdbapi.com/?t=' + movieName +'&y=&tomatoes=true&plot=short&r=json';

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
}

// gets command and search argument from a random.txt file and performs the stated operation
var random = function() {

	fs.readFile('random.txt', 'utf8', function(err, data) {
		if (err) {
			throw err;
		}
// changes the string from the random.txt into an array so that it can be utilized for the switch and spotify api.
		var dataArray = data.split(",");
		nodeArgs[2] = dataArray[0];
		nodeArgs[3] = dataArray[1];
		command(nodeArgs[2]);
	})
}

// The magic maker. Ensures the appropriate function is called based on the command issued
var command = function(nodeArgs) {
	switch(nodeArgs){
	    case 'my-tweets':
	        myTwitter();
	    break;

	    case 'spotify-this-song':
	        mySpotify();
	    break;

	    case 'movie-this':
	        myMovie();
	    break;

	    case 'do-what-it-says':
	        random();
	    break;
	}
}

command(nodeArgs[2]);



