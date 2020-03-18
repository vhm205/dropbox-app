const chalk = require('chalk');
const seeder = require('mongoose-seed');
const faker = require('faker');

const log = console.log
const red = chalk.red.bold;


let items = [];
for (let index = 0; index < 10000; index++) {
	items = [...items, {
		email: faker.internet.email(),
		product: faker.commerce.productName(),
		address: faker.address.streetAddress(),
		password: faker.internet.password(),
		phone: faker.phone.phoneNumber(),
		descript: faker.lorem.text(),
		avatar: faker.internet.avatar(),
		ipv6: faker.internet.ipv6()
	}]
}

log(red(items))

let data = [{
	'model': 'Category',
	'documents': items
}]

const url = 'mongodb://localhost:27017/test'

seeder.connect(url, () => {
	seeder.loadModels(['./models/Category.js'])

	seeder.clearModels(['Category'], () => {
		seeder.populateModels(data, () => {
			seeder.disconnect()
		})
	})

})
