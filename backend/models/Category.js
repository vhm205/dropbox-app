var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
var Schema = mongoose.Schema;

var CategorySchema = new mongoose.Schema({
	email: String,
	product: String,
	password: String,
	address: String,
	phone: String,
    descript : String,
	avatar: String,
	ipv6: String,
    createdOn: { type: Date, 'default': Date.now }
});

module.exports = mongoose.model('Category', CategorySchema);
