const express = require('express');
const chalk = require('chalk');
const router = express.Router();
const path = require('path')
const url = require('url')

const log = console.log
const red = chalk.red.bold;

/* GET home page. */
router.get('/', function(req, res) {
	console.log(path.basename(__dirname), path.dirname(__dirname));
	
	res.render('index', { title: 'Express' });
});

module.exports = router;
