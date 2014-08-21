var cheerio = require('cheerio'),
	express = require('express'),
	fs = require('fs'),
	request = require('request'),
	app = express();

app.get('/', function (req, res) {

  res.send('Fantasy begins now.');

});

app.listen('1985');