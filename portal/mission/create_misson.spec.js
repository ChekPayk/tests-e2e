const authorize = require('../../authorize/login');
jest.setTimeout(40000);
describe('Создание задачи', () => {
  let browser;
  let page;

  beforeAll(async () => {
    ({browser, page} = await authorize('volkova_elv', 'password','https://domain.example.com/#/missions'));
  });

  afterAll(async () => {
    if (!browser) return;
    await browser.close();
  });

  test('Создание задачи', async () => {
    await page.waitForSelector('#full-nav-menu-create-button');
    await page.click('#full-nav-menu-create-button');
    await page.waitForSelector('#mission-subject');
    await page.click('#mission-subject');
    await page.type('#mission-subject', 'TEST');
    const taskName = 'TEST';
    await page.click('#mission-assignee');
    await page.type('#mission-assignee', 'фамилия имя');
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('Enter');
    await page.click('#mission-expansion-panel-btn');
    await page.waitForSelector('#mission-expansion-performers');
    await page.click('#mission-expansion-performers');
    await page.type('#mission-expansion-performers', 'фамилия имя');
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('Enter');
    await page.click('#mission-subject');
    await page.waitForSelector('#mission-expansion-observers');
    await page.click('#mission-expansion-observers');
    await page.type('#mission-expansion-observers', 'фамилия имя');
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('Enter');
    await page.click('#mission-subject');
    await page.click('#work-with-event-form-save-button');
    await page.waitForSelector('#work-with-event-form-alert-button');
    const buttonId = '#work-with-event-form-alert-button';
    const hrefValue = await page.$eval(buttonId, button => button.href);
    page.goto(hrefValue);
    await page.waitForSelector('#mission-page-header-card-title-text');
    const taskCardName = await page.$eval('#mission-page-header-card-title-text', element => element.innerText);
    if (taskName) {
        expect(taskCardName).toEqual(taskName);
        console.log('Текущий заголовок страницы:', taskCardName);
      } else {
        throw new Error('Элемент названия задачи не найден');
      }
  });
});