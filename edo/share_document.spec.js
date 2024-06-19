const authorize = require('../authorize/login');
jest.setTimeout(40000);
describe('Переслать документ', () => {
  let browser;
  let page;

  beforeAll(async () => {
    ({browser, page} = await authorize('volkova_elv', 'password','https://domain.example.com/#/document/10044396/fromFolder=10031697'));
  });

  afterAll(async () => {
    if (!browser) return;
    await browser.close();
  });

  test('Переслать документ"', async () => {
    await page.waitForSelector('#v-menu-button-share-button');
    await page.click('#v-menu-button-share-button');
    await page.waitForSelector('#document-card-actions-redirect-btn');
    await page.click('#document-card-actions-redirect-btn');
    await page.waitForSelector('.dx-checkbox-icon');
    const checkboxIcons=await page.$$('.dx-checkbox-icon');
    await checkboxIcons[1].click();
    await page.click('#document-redirect-form-redirect-btn');
    await page.waitForTimeout(1500);
    
    await page.waitForSelector('#document-card-desktop-resolution-btn');
    await page.click('#document-card-desktop-resolution-btn', {clickCount: 2});
    // await page.waitForTimeout(1500);
    
    const recipientNameSelector = '#recipient-name';
    await page.waitForSelector(recipientNameSelector);
    
    const recipientNameElements = await page.$$eval(recipientNameSelector, elements =>
      elements.map(el => el.textContent.trim())
    );
    
    const surnameToCheck = 'Волкова Е.В.';
    const containsSurname = recipientNameElements.some(name => name.includes(surnameToCheck));
    
    if (containsSurname) {
      console.log(`Фамилия ${surnameToCheck} присутствует`);
    } else {
      console.log(`Фамилия ${surnameToCheck} НЕ присутствует`);
    }
    expect(containsSurname).toBeTruthy();
  });
});