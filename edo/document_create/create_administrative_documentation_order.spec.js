const authorize = require('../../authorize/login');
jest.setTimeout(30000);
describe('Создание приказа с эл согласованием', () => {
  let browser;
  let page;

  beforeAll(async () => {
    ({browser, page,} = await authorize('volkova_elv', 'password', 'https://domain.example.com/#/create/administrative_documentation_create?step=1&type=400'));
  });

  afterAll(async () => {
    if (!browser) return;
    await browser.close();
  });

  test('Создание приказа с эл согласованием', async () => {
    await page.waitForSelector('#administrative-documentation-information-subject');
    await page.click('#administrative-documentation-information-subject');
    await page.type('#administrative-documentation-information-subject', 'TEST');
    await page.waitForSelector('#administrative-documentation-information-preamble');
    await page.click('#administrative-documentation-information-preamble');
    await page.type('#administrative-documentation-information-preamble', 'TEST');
    await page.click('#add-point-responsible');
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('Enter');
    await page.click('#add-point-text');
    await page.type('#add-point-text', 'TEST');
    await page.waitForSelector('#date-box-input');
    await page.click('#date-box-input');
    await page.waitForSelector('.v-date-picker-table__current');
    await page.click('.v-date-picker-table__current');
    await page.waitForSelector('#add-point-control');
    await page.click('#add-point-control');
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('Enter');
    const clickDelay = 1000;
    for (let i = 0; i < 4; i++) {
      await page.waitForSelector('#administrative-documentation-next-button');
      const buttons = await page.$$('#administrative-documentation-next-button');
      await buttons[0].click();
      await page.waitForTimeout(clickDelay);
    }
    await page.waitForSelector('#administrative-documentation-send-for-approval');
    await page.click('#administrative-documentation-send-for-approval');
    await page.waitForNavigation();
    // Проверка совпадения заголовка
    const pageTitle = await page.title('.panel-subtitle');
    const expectedTitle = 'Исходящие';
    console.log('Текущий заголовок страницы:', pageTitle);
    expect(pageTitle).toBe(expectedTitle);
  });
});