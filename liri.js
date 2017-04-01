var Twitter = require('twitter');
var keysRef = require('./keys.js');
var request = require('request');
var spotify = require('spotify');

/*Query Movie Database*/

if (process.argv[2] === "movie-this") {
	if (process.argv[3]) {

		var movieName = "";

		for (var i = 3; i < process.argv.length; i++) {
			if (i == 3) movieName = movieName + process.argv[i];
			else movieName = movieName + "+" + process.argv[i];
		}

		console.log(movieName);

		var queryUrl = 'http://www.omdbapi.com/?t=' + movieName + '&y=&plot=short&r=json';

		request(queryUrl, function (er, res, body) {
			console.log("Title: " + JSON.parse(body).Title + "\nYear: " + JSON.parse(body).Year + "\nIMDB Rating: " + JSON.parse(body).Ratings[0].Value + "\nCountry: " + JSON.parse(body).Country +"\nLanguage: " + JSON.parse(body).Language + "\nPlot: " + JSON.parse(body).Plot + "\nActors: " + JSON.parse(body).Actors + "\nRotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].value + "\nRotten Tomatoes URL: https://www.rottentomatoes.com/search/?search=" + movieName);
		});
	} 
/*if no movie is chosen then display Mr Nobody*/
	else {

		var queryUrl = 'http://www.omdbapi.com/?t=mr+nobody&y=&plot=short&r=json';

		request(queryUrl, function (er, res, body) {
			console.log("Title: " + JSON.parse(body).Title + "\nYear: " + JSON.parse(body).Year + "\nIMDB Rating: " + JSON.parse(body).Ratings[0].Value + "\nCountry: " + JSON.parse(body).Country +"\nLanguage: " + JSON.parse(body).Language + "\nPlot: " + JSON.parse(body).Plot + "\nActors: " + JSON.parse(body).Actors + "\nRotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].value + "\nRotten Tomatoes URL: https://www.rottentomatoes.com/search/?search=" + movieName);

		});
	};
	};

/*Spotify call to bring back song information*/
if (process.argv[2] === "spotify-this-song") {
	if (process.argv[3]) {
		var songSearch = "";

		for (var i = 3; i < process.argv.length; i++) {
			if (i == 3) songSearch = songSearch + process.argv[i];
			else songSearch = songSearch + "+" + process.argv[i];
		};

		spotify.search({ type: 'track', query: songSearch}, function(err, data) {
			if ( err ) {
			console.log('Error occurred: ' + err);
			return;
			};

		console.log("Artist: " + data.tracks.items[0].artists[0].name);
		console.log("Song Name: " + songSearch);
		console.log("Preview link: " + data.tracks.items[0].artists[0].external_urls.spotify);
		console.log("Album: " + data.tracks.items[0].album.name);
		});
	}
/*If no song is chosen default to The Sign by Ace of Base*/
	else
	{
		spotify.search({ type: 'album', query: 'The Sign'}, function(err, data) {
			if ( err ) {
			console.log('Error occurred: ' + err);
			return;
			};

		console.log("Artist: " + data.albums.items[1].artists[0].name);
		console.log("Song Name: The Sign");
		console.log("Preview link: " + data.albums.items[1].artists[0].external_urls.spotify);
		console.log("Album: " + data.albums.items[1].name);
		});
	};
};

/*Twitter calls*/
if (process.argv[2] === "my-tweets") {

	const consumer_key = keysRef.twitterKeys.consumer_key;
	const consumer_secret = keysRef.twitterKeys.consumer_secret;
	const access_token_key = keysRef.twitterKeys.access_token_key;
	const access_token_secret = keysRef.twitterKeys.access_token_secret;
	
	const TwitterRef = require('Twitter');
		var client = new TwitterRef({
		    consumer_key: consumer_key,
		    consumer_secret: consumer_secret,
		    access_token_key: access_token_key,
		    access_token_secret: access_token_secret
  		});
		console.log(consumer_key);
		console.log(consumer_secret);
		console.log(access_token_key);
		console.log(access_token_secret);

	var params = {screen_name: 'juanmiossa'};
	client.get('statuses/user_timeline', params, function(error, tweets, response) {
  		if ( error ) {
			console.log('Error occurred: ' + error);
			return;
			};
		for (var i = 0; i < tweets.length; i++) {
			console.log("Tweet: " + tweets[i].text + "\nLocation: " + tweets[i].user.location +"\n-------\n");
		}
	});
};

