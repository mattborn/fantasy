
var express = require('express'),
	moment = require('moment');

var app = module.exports = express();

app.get('/test', function (req, res) {

	var a = moment().startOf('week').format('YYMMDD');

	res.send(a);

});
