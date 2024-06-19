const authorize = require('../../authorize/login');
const insertTextIntoInput = require('../../utils/insert_text_into_input');
jest.setTimeout(40000);
describe('Закрытие и перезапуск задачи', () => {
  let browser;
  let page;

  beforeAll(async () => {
    ({browser, page} = await authorize('volkova_elv', 'password','https://domain.example.com/#/missions/223010'));
    // ({inputSelector,timePicker} = await insertTextIntoInput( '#time-text-field-with-picker-time', '16:00'));
  });

  afterAll(async () => {
    if (!browser) return;
    await browser.close();
  });

  test('Закрытие и перезапуск задачи', async () => {
    await page.waitForSelector('#mission-page-actions-bar-close-btn');
    await page.click('#mission-page-actions-bar-close-btn');
    await page.waitForSelector('#mission-page-message-title');
    const realInfoName = 'Задача закрыта';
    const infoName = await page.$eval('#mission-page-message-title', element => element.innerText);
    if (infoName) {
      expect(realInfoName).toEqual(infoName);
      console.log('Заголовок в инфоблоке:', infoName);
    } else {
      throw new Error('Заголовок не найден');
    }
    // Проверка: На доработку
    await page.click('#mission-page-actions-bar-restart-btn');
    await page.waitForSelector('#date-text-field-with-picker-date');
    await page.click('#date-text-field-with-picker-date');
    await page.waitForSelector('.v-date-picker-table__current');
    await page.click('.v-date-picker-table__current');

    await page.waitForSelector('#time-text-field-with-picker-time');
    const inputSelector = '#time-text-field-with-picker-time';
    const timePicker = '16:00';
    await insertTextIntoInput (page, inputSelector,timePicker);
    
    await page.click('#mission-restart-template-save-restart-mission-btn');
    
    await page.waitForSelector('#mission-page-header-data-text');
    const deadline = await page.$eval('#mission-page-header-data-text', element => element.innerText);
    expect(deadline.split(',')[0]).toEqual(timePicker);
    console.log('Текущий срок задачи:', deadline);
    await page.click('#mission-page-actions-bar-open-btn');
  });
});