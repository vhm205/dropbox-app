const puppeteer = require('puppeteer');


(async () => {
	const options = {
		args: ['--no-sandbox', '--disable-setuid-sandbox'], 
		headless: false
	}
	const browser = await puppeteer.launch(options)
	const page = await browser.newPage()
	await page.setViewport({
		width: 1440,
		height: 900
	})
	await page.goto('https://www.google.com/', {
		waitUntil: 'networkidle2'
	})
	// await page.screenshot({
	// 	path: 'example.png',
	// 	fullPage: true
	// })

	const selector1 = '#tsf > div:nth-child(2) > div.A8SBwf > div.RNNXgb > div > div.a4bIc > input'
	await page.waitForSelector(selector1)
	await page.focus(selector1)

	await page.keyboard.type('gg images')
	await page.keyboard.press(String.fromCharCode(13))

	await page.waitForXPath('//*[@id="rso"]/div[1]/div/div/div/div[1]/a')

	await page.$eval('#rso > div:nth-child(1) > div > div > div > div.r > a', el => el.click())

	const selector2 = '#sbtc > div > div.a4bIc > input'
	await page.waitForSelector(selector2)
	await page.focus(selector2)

	await page.keyboard.type('hot girls')
	await page.keyboard.press(String.fromCharCode(13))

	await page.waitForXPath('//*[@id="islrg"]/div[1]/div[2]/a[1]/div[1]')

	await page.$$eval('#islrg > div.islrc > div:nth-child(2) > a.wXeWr.islib.nfEiy.mM5pbd > div.bRMDJf.islir > img', el => {
		console.log(el);
		
	})

	// await page.evaluate(() => {
	// 	let el = document.querySelectorAll('.rg_i.Q4LuWd.tx8vtf')

	// 	console.log(el);
		
	// })

	// await browser.close()
})()