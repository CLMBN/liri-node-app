var Twitter = require('twitter');
var request = require('request');
var spotify = require('spotify');
var fs = require("fs");
/*var logWrite = "";
function postLog() {
	fs.appendFile('log.txt', logWrite, function (err) {
		  if (err) throw err;
		  console.log('Saved!');
		});
};*/

/*Query Movie Database*/

if (process.argv[2] === "movie-this") {
	runMovies();
}

function runMovies() {
	if (process.argv[3]) {

		var movieName = "";

		for (var i = 3; i < process.argv.length; i++) {
			if (i == 3) movieName = movieName + process.argv[i];
			else movieName = movieName + "+" + process.argv[i];
		}

		console.log(movieName);

		var queryUrl = 'http://www.omdbapi.com/?t=' + movieName + '&y=&plot=short&r=json';

		request(queryUrl, function (er, res, body) {
			var logWrite = "Title: " + JSON.parse(body).Title + "\nYear: " + JSON.parse(body).Year + "\nIMDB Rating: " + JSON.parse(body).Ratings[0].Value + "\nCountry: " + JSON.parse(body).Country +"\nLanguage: " + JSON.parse(body).Language + "\nPlot: " + JSON.parse(body).Plot + "\nActors: " + JSON.parse(body).Actors + "\nRotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].value + "\nRotten Tomatoes URL: https://www.rottentomatoes.com/search/?search=" + movieName + "\n-------\n";
			
			console.log(logWrite);
			fs.appendFile('log.txt', logWrite, function (err) {
			  if (err) throw err;
			  console.log('Saved!');
			});
		});
	} 

/*if no movie is chosen then display Mr Nobody*/
	else {

		var queryUrl = 'http://www.omdbapi.com/?t=mr+nobody&y=&plot=short&r=json';

		request(queryUrl, function (er, res, body) {
			var logWrite = "Title: " + JSON.parse(body).Title + "\nYear: " + JSON.parse(body).Year + "\nIMDB Rating: " + JSON.parse(body).Ratings[0].Value + "\nCountry: " + JSON.parse(body).Country +"\nLanguage: " + JSON.parse(body).Language + "\nPlot: " + JSON.parse(body).Plot + "\nActors: " + JSON.parse(body).Actors + "\nRotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].value + "\nRotten Tomatoes URL: https://www.rottentomatoes.com/search/?search=" + movieName + "\n-------\n";
			console.log(logWrite);
			fs.appendFile('log.txt', logWrite, function (err) {
			  if (err) throw err;
			  console.log('Saved!');
			});
		});
	};
	};

/*Spotify call to bring back song information*/
if (process.argv[2] === "spotify-this-song") {
	runSpotify();
}

function runSpotify() {
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

			var logWrite = "Artist: " + data.tracks.items[0].artists[0].name + "\nSong Name: " + songSearch + "\nPreview link: " + data.tracks.items[0].artists[0].external_urls.spotify + "\nAlbum: " + data.tracks.items[0].album.name + "\n-------\n"
			console.log(logWrite);
			fs.appendFile('log.txt', logWrite, function (err) {
			  if (err) throw err;
			  console.log('Saved!');
			});
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
			var logWrite = "Artist: " + data.albums.items[1].artists[0].name + "\nSong Name: The Sign" + "\nPreview link: " + data.albums.items[1].artists[0].external_urls.spotify + "\nAlbum: " + data.albums.items[1].name + "\n-------\n"
			console.log(logWrite);
			fs.appendFile('log.txt', logWrite, function (err) {
			  if (err) throw err;
			  console.log('Saved!');
			});
		});
	};
};

/*Twitter calls*/
if (process.argv[2] === "my-tweets") {
	runTweets();
}

function runTweets() {
	var keysRef = require('./keys.js');

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
		for (var i = 0; i < 20; i++) {
			console.log("Number: " + [i] + "\nTweet: " + tweets[i].text + "\nCreated: " + tweets[i].user.created_at +"\n-------\n");
		}
	});
};


/*Do what it says referece the random.txt file*/
if (process.argv[2] === "do-what-it-says") {
	runRandom();
}

function runRandom() {
	fs.readFile("random.txt", "utf8", function(error, data) {

	    if(error)
	    {
	        console.log("I had an error reading your file.");
	    }
	    else
	    {

		 console.log(data);

		 var dataArr = data.split(",");

		 /*console.log(dataArr);*/

	/*if contents of random.txt is a spotify song run the spotify query*/
			if (dataArr[0] === 'spotify-this-song') {
				songSearch = dataArr[1];
				
				spotify.search({ type: 'track', query: songSearch}, function(err, data) {
					if ( err ) {
					console.log('Error occurred: ' + err);
					return;
					};
				var logWrite = "Artist: " + data.tracks.items[0].artists[0].name + "\nSong Name: " + songSearch + "\nPreview link: " + data.tracks.items[0].artists[0].external_urls.spotify + "\nAlbum: " + data.tracks.items[0].album.name + "\n-------\n"
				console.log(logWrite);
				fs.appendFile('log.txt', logWrite, function (err) {
				  if (err) throw err;
				  console.log('Saved!');
				});
				});
			};

	/*if contents of random.txt is a spotify song run the movie query*/
			if (dataArr[0] === 'movie-this') {
				movieName = dataArr[1];
				var queryUrl = 'http://www.omdbapi.com/?t=' + movieName + '&y=&plot=short&r=json';

				request(queryUrl, function (er, res, body) {
				var logWrite = "Title: " + JSON.parse(body).Title + "\nYear: " + JSON.parse(body).Year + "\nIMDB Rating: " + JSON.parse(body).Ratings[0].Value + "\nCountry: " + JSON.parse(body).Country +"\nLanguage: " + JSON.parse(body).Language + "\nPlot: " + JSON.parse(body).Plot + "\nActors: " + JSON.parse(body).Actors + "\nRotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].value + "\nRotten Tomatoes URL: https://www.rottentomatoes.com/search/?search=" + movieName + "\n-------\n";
			
				console.log(logWrite);
				fs.appendFile('log.txt', logWrite, function (err) {
				  if (err) throw err;
				  console.log('Saved!');
				});
				});

			}
		};
	});
};

