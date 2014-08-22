var _ = require('lodash'),
	cheerio = require('cheerio'),
	express = require('express'),
	fs = require('fs'),
	request = require('request'),
	app = express(),
	espn_rankings = require('./espn_rankings'),
	fantasypros_rankings = require('./fantasypros_rankings');

app.use(express.static(__dirname + '/public'));

app.use(espn_rankings);
app.use(fantasypros_rankings);

app.listen('1985');