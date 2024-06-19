const logout = async (page) => {
  
  await page.goto('https://domain.example.com/#/');
  await page.waitForSelector('.current-user__menu');
  await page.click('.current-user__menu');
  page.click('#logout-button');
  await page.waitForSelector('.greeting-panel');

  return {page};
};

module.exports = logout;