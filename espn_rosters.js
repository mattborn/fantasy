
var _ = require('lodash'),
	cheerio = require('cheerio'),
	config = require('./config'),
	express = require('express'),
	fs = require('fs'),
	request = require('request');

var app = module.exports = express();

app.get('/rosters/espn', function (req, res) {

	var league = 823439,
		url = 'http://games.espn.go.com/ffl/leaguerosters?leagueId='+ league,
		json = [];

	// request.post({
	// 	uri: 'https://r.espn.go.com/members/login',
	// 	headers: {
	// 		'content-type': 'application/x-www-form-urlencoded'
	// 	},
	// 	body: require('querystring').stringify({
	// 		count: 0,
	// 		SUBMIT: 1,
	// 		language: 'en',
	// 		affiliateName: 'espn',
	// 		regFormId: 'espn',
	// 		appRedirect: 'https://r.espn.go.com/members/index',
	// 		username: config.espn_username,
	// 		password: config.espn_password
	// 	})
	// }, function (err, res, body) {
	// 	console.log(arguments);
	// 	// console.log(response.statusCode);
	// 	return;
	// });

	request(url, function (err, res, body) {

		if (!err && res.statusCode == 200) {

			var $ = cheerio.load(body),
				teams = [];

			console.log(body);

	// 		// _.each($('.playerTableTable'), function (i, table) {
	// 		// 	// var $table = $(table),
	// 		// 	// 	team = {
	// 		// 	// 		players: []
	// 		// 	// 	};

	// 		// 	// team.name = $table.find('.playerTableBgRowHead a').text();

	// 		// 	console.log(table);
	// 		// });

	// 		// $('#data tbody tr').each(function (i, row) {
	// 		// 	var data = $(row),
	// 		// 		player = {};

	// 		// 	player.fp_rank = data.children().first().text();
	// 		// 	player.name = data.children().eq(1).children().first().text();
	// 		// 	player.fp_position = data.children().eq(2).text();

	// 		// 	json.push(player);
	// 		// });

	// 		// var file = 'public/rankings-fantasypros.json',
	// 		// 	backup = 'data/rankings-fantasypros-'+ Date.now() +'.json';
			
	// 		// // Backup previous file
	// 		// fs.rename(file, backup, function () {
	// 		// 	console.log('created '+ backup);
	// 		// });

	// 		// fs.writeFile(file, JSON.stringify(json, null, 4), function (err) {
	// 		// 	console.log('created '+ file);
	// 		// });

			res.status(200).end();

		}

	});
});
