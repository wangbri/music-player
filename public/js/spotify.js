var loginContainer = document.getElementById('spotify-login-container');
var loginButton = document.getElementById('spotify-login-button');

const clientID = "25fcb6d7f797411a92f805b55f27555d";
const redirectURI = encodeURIComponent("https://evening-island-56051.herokuapp.com/");

class SpotifyHandler {
	constructor() {

	}

	login() {
		window.open(`https://accounts.spotify.com/authorize/?client_id=${clientID}`
					+ `&response_type=code&redirect_uri=${redirectURI}`,
					"Login with Spotify");
	}
}

var spotifyHandler = new SpotifyHandler();

loginButton.addEventListener('click', function() {
	console.log('click');
	spotifyHandler.login();
});