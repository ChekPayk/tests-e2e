const puppeteer = require('puppeteer');

const authorize = async (login, password, startUrl = 'https://domain.example.com/#/',waitUntil = 'networkidle2') => {
  const browser = await puppeteer.launch(({headless: false, slowMo: 30, defaultViewport: null, args: ['--start-maximized']}));
  const page = await browser.newPage();

  // Логинимся на новой открытой странице
  await page.goto(startUrl);
  await page.type('#Username', login);
  await page.type('#Password', password);
  await page.click('button');
  await page.waitForNavigation(waitUntil);

  return {browser, page};
};

module.exports = authorize;


//({headless: false, slowMo: 40})
// const browser = await puppeteer.launch(({headless: false, slowMo: 30, defaultViewport: null, args: ['--start-maximized']}));

// await page.waitForNavigation({waitUntil: 'domcontentloaded'});