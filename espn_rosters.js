
var _ = require('lodash'),
	cheerio = require('cheerio'),
	config = require('./config'),
	express = require('express'),
	fs = require('fs'),
	moment = require('moment'),
	request = require('request');

var app = module.exports = express();

app.get('/rosters/espn', function (req, res) {

	fs.readFile('./data/rosters-espn.html', {
			encoding: 'utf8'
		}, function (err, data) {
			if (err) throw err;

			var $ = cheerio.load(data);

			var teams = _.map($('.playerTableTable'), function (t, i) {
				
				var team = {},
					name = $(t).find('.playertableSectionHeader a'),
					rows = $(t).find('.pncPlayerRow');
				
				team.id = i + 1;
				team.name = name.text();
				team.players = _.map(rows, function (p, i) {
					
					var player = {};

					player.name = $(p).find('.playertablePlayerName a').text();

					return player;
				});
				
				return team;
			});

			var today = moment().format('YYMMDD'),
				now = parseInt(Date.now().toString().substr(5,5)),
				file = 'data/rosters-espn-'+ today +'.json',
				backup = 'data/rosters-espn-'+ today + '-' + now +'.json';
			
			// Backup previous file
			fs.rename(file, backup, function () {
				console.log('created '+ backup);
			});

			fs.writeFile(file, JSON.stringify(teams, null, 4), function () {
				console.log('created '+ file);
			});
		}
	);

	res.status(200).end();
});
