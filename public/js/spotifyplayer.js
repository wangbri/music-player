const request = require('request');

const clientID = "25fcb6d7f797411a92f805b55f27555d";
const redirectURI = encodeURIComponent("https://evening-island-56051.herokuapp.com");

class SpotifyHandler {
	constructor() {

	}

	login() {
		var response_data = "";

		request.get(`https://accounts.spotify.com/authorize/?client_id=${clientID}`
					+ `&response_type=code&redirect_uri=${redirectURI}&response_type=token`)
		.on('error', function(err) {
			console.log("ERROR: " + err);
		})
		.on('data', function(res) {
			response_data += res;
		})
		.on('end', function(res) {
			console.log(response_data);
		});
	}
}

var spotifyHandler = new SpotifyHandler();
spotifyHandler.login();