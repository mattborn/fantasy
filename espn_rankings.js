
var _ = require('lodash'),
	cheerio = require('cheerio'),
	express = require('express'),
	fs = require('fs'),
	request = require('request');

var app = module.exports = express();

app.get('/rankings/espn', function (req, res) {

	var league = 823439, // Serious League
		urls = [
			'http://games.espn.go.com/ffl/tools/projections?leagueId='+ league,
			'http://games.espn.go.com/ffl/tools/projections?leagueId='+ league + '&startIndex=40',
			'http://games.espn.go.com/ffl/tools/projections?leagueId='+ league + '&startIndex=80',
			'http://games.espn.go.com/ffl/tools/projections?leagueId='+ league + '&startIndex=120',
			'http://games.espn.go.com/ffl/tools/projections?leagueId='+ league + '&startIndex=160',
			'http://games.espn.go.com/ffl/tools/projections?leagueId='+ league + '&startIndex=200'
		],
		count = 0,
		json = [];

	_.each(urls, function (url) {
		request(url, function (error, response, body) {

			if (!error && response.statusCode == 200) {

				var $ = cheerio.load(body);

				_.each($('.pncPlayerRow'), function (row) {

					var player = {};

					$(row).first().filter(function () {
						var data = $(this),
							s1 = data.find('.playertablePlayerName').text().split('\u00a0'),
							s2;

						if (s1[0].indexOf(',')) {
							s2 = s1[0].split(', ');
							player.name = s2[0];
							player.team = s2[1];
						} else {
							player.name = s1[0];
						}

						player.rank = data.children().first().text();
						player.position = s1[1];
						player.points = data.children().last().text();
					});

					json.push(player);

				});

				count++;

				if (count === urls.length) {
					console.log('scrape complete');

					var file = 'public/rankings-espn.json',
						backup = 'data/rankings-espn-'+ Date.now() +'.json';
					
					// Backup previous file
					fs.rename(file, backup, function () {
						console.log('created '+ backup);
					});

					fs.writeFile(file, JSON.stringify(json, null, 4), function (err) {
						console.log('created '+ file);
					});

					res.status(200).end();
				}

			}

		});
	});

});
