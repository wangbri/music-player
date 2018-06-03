var loginContainer = document.getElementById('js-login-container');
var loginButton = document.getElementById('js-login-button');

const clientID = "25fcb6d7f797411a92f805b55f27555d";
const redirectURI = encodeURIComponent("http://localhost:5000");

class SpotifyHandler {
	constructor(clientID, redirectURI) {
		this.clientID = clientID;
		this.redirectURI = redirectURI;
		this.accessToken = null;
	}

	login() {
		return new Promise(function(resolve, reject) {
			const width = 450, height = 550, left = screen.width / 2 - width / 2, top = screen.height / 2 - height / 2;
			const authURL = `https://accounts.spotify.com/authorize/?client_id=${this.clientID}`
							+ `&response_type=code&redirect_uri=${this.redirectURI}`

			const loginWindow = window.open(authURL,"Login with Spotify",
								"menubar=no,location=no,resizable=no,scrollbar=no,status=no," + 
								`width=${width},height=${height},left=${left},top=${top}`);

			var getToken = setInterval(function() {
				if (loginWindow.location.href != authURL) {
					this.accessToken = loginWindow.location.href.split("=")[1];
					console.log(this.accessToken);
					clearInterval(getToken);
					loginWindow.close();
				}
			}, 1000);

			if (this.accessToken == null) {
				reject();
			} else {
				resolve(this.accessToken);
			}
		});
	}
}

var spotifyHandler = new SpotifyHandler(clientID, redirectURI);

loginButton.addEventListener('click', function() {
	spotifyHandler.login();
});