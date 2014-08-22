
var _ = require('lodash'),
	cheerio = require('cheerio'),
	express = require('express'),
	fs = require('fs'),
	request = require('request');

var app = module.exports = express();

app.get('/rankings/fantasypros', function (req, res) {

	var url = "http://www.fantasypros.com/nfl/adp/overall.php",
		json = [];

	request(url, function (error, response, body) {

		if (!error && response.statusCode == 200) {

			var $ = cheerio.load(body);

			$('#data tbody tr').each(function (i, row) {
				var data = $(row),
					player = {};

				player.rank = data.children().first().text();
				player.name = data.children().eq(1).children().first().text();
				player.position = data.children().eq(2).text();

				json.push(player);
			});

			var file = 'public/rankings-fantasypros.json',
				backup = 'data/rankings-fantasypros-'+ Date.now() +'.json';
			
			// Backup previous file
			fs.rename(file, backup, function () {
				console.log('created '+ backup);
			});

			fs.writeFile(file, JSON.stringify(json, null, 4), function (err) {
				console.log('created '+ file);
			});

			res.status(200).end();

		}

	});
});
