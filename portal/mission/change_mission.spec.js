const authorize = require('../../authorize/login');
jest.setTimeout(20000);
describe('Изменение задачи', () => {
  let browser;
  let page;

  beforeAll(async () => {
    ({browser, page} = await authorize('volkova_elv', 'password','https://domain.example.com/#/missions/222931'));
  });

  afterAll(async () => {
    if (!browser) return;
    await browser.close();
  });

  test('Изменение задачи', async () => {
    await page.waitForSelector('#mission-page-actions-bar-change-btn');
    await page.click('#mission-page-actions-bar-change-btn');
    await page.waitForSelector('#date-text-field-with-picker-date');
    await page.click('#date-text-field-with-picker-date');
    await page.waitForSelector('.v-date-picker-table__current');
    await page.click('.v-date-picker-table__current');

    await page.waitForSelector('#time-text-field-with-picker-time');
    await page.click('#time-text-field-with-picker-time');
    await page.keyboard.down('Control');
    await page.keyboard.press('KeyA');
    await page.keyboard.up('Control');
    await page.type('#time-text-field-with-picker-time', '16:00');
    const timePicker = '16:00';
    await page.click('#mission-subject');
    await page.waitForSelector('#mission-assignee');
    await page.click('#mission-assignee');
    await page.type('#mission-assignee', 'Фамилия');
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('Enter');
    await page.click('#work-with-event-form-save-button');

    await page.waitForSelector('#mission-page-header-data-text');
    const dataName = await page.$eval('#mission-page-header-data-text', element => element.innerText);
    if (timePicker) {
      expect(dataName.split(',')[0]).toEqual(timePicker);
      console.log('Текущий срок задачи:', dataName);
    } else {
      throw new Error('Срок не найден');
    }
  });
});