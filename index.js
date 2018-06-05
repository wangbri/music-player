const express = require('express');
const path = require('path');
const cool = require('cool-ascii-faces');
const request = require('request');
const querystring = require('querystring');

const PORT = process.env.PORT || 5000;
const client_id = "25fcb6d7f797411a92f805b55f27555d";
const client_secret = "a200f34bb0434a91b8197891f47cb135";
const redirect_uri = "http://localhost:5000/cool";

var app = express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('index'))
  .get('/cool', (req, res) => res.send(cool()));

var server = require('http').Server(app);
var io = require('socket.io')(server);

server.listen(PORT);

io.on('connection', function(socket) {
	socket.on('login', function(data) {

	  	// application requests authorization
		var scope = 'user-read-private user-read-email';
		var authUrl = 'https://accounts.spotify.com/authorize?' +
			querystring.stringify({
				response_type: 'code',
				client_id: client_id,
				scope: scope,
				redirect_uri: redirect_uri,
				show_dialog: true
			});

		io.emit('login', authUrl);
	});

	socket.on('access', function(req, res) {

		// application requests refresh and access tokens
		// after checking the state parameter
		var authOptions = {
			url: 'https://accounts.spotify.com/api/token',
			form: {
				code: code,
				redirect_uri: redirect_uri,
				grant_type: 'authorization_code'
			},
			headers: {
				'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
			},
			json: true
		};

		request.post(authOptions, function(error, response, body) {
			if (!error && response.statusCode === 200) {
				var access_token = body.access_token;
				var refresh_token = body.refresh_token;

				var options = {
					url: 'https://api.spotify.com/v1/me',
					headers: {'Authorization': 'Bearer ' + access_token},
					json: true
				};

				// use the access token to access the Spotify Web API
				request.get(options, function(error, response, body) {
					console.log(body);
				});

				io.emit('access', access_token)
			}
		});
	});
});

//app.listen(PORT, () => console.log(`Listening on ${PORT}`));
