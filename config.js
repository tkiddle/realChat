// This file handles the configuration of the app.

var express = require('express'),
	serveStatic = require('serve-static'),
	bodyParser = require('body-parser');

module.exports = function (app, io) {
	
	// Tell express we're using Jade
	app.set('view engine', 'jade');

	// Require the jade module
	app.engine('jade', require('jade').__express)

	// Set the template directory
	app.set('views', __dirname + '/templates');

	// Make static assets available
	app.use(serveStatic(__dirname + '/public'));

	// Initialise the body parser
	app.use(bodyParser());

};