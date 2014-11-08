
var _ = require('lodash'),
	backbone = require('backbone'),
	cheerio = require('cheerio'),
	config = require('./config'),
	express = require('express'),
	fs = require('fs'),
	moment = require('moment'),
	request = require('request');

var app = module.exports = express();

app.get('/crunch', function (req, res) {

	var latest_rosters = './data/rosters-espn-141012.json',
		rosters = JSON.parse(fs.readFileSync(latest_rosters).toString()),
		dest = './data/scoring-espn.json';

	for (var w = 6; w >= 3; w--) {

		// json['week_'+ w] = [];

		for (var n = 1; n <= 6; n++) {

			var src = './data/scoring-espn-'+w+'-'+n+'.html',
				data = fs.readFileSync(src).toString(),
				$ = cheerio.load(data);

			_.each($('.pncPlayerRow'), function (x, i) {
				var name = $(x).find('.playertablePlayerName a').first().text(),
					points = parseFloat($(x).find('.playertableStat').last().text());

				_.each(rosters, function (r, i) {
					_.each(r.players, function (p, i) {
						if (p.name === name) {
							p['week_'+ w] = points;
							// console.log(p);
						}
					});
				});

				// json['week_'+ w].push(player);
			});

			if (w === 3 && n === 6) {
				fs.writeFile(dest, JSON.stringify(rosters, null, 4), function (err) {
					if (err) throw err;
					console.log('created '+ dest);
				});
			}
		}
	}

	res.status(200).end();
});
