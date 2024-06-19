const authorize = require('../../authorize/login');
jest.setTimeout(60000);

describe('Создание совещания', () => {
  let browser;
  let page;

  beforeAll(async () => {
    ({browser, page} = await authorize('volkova_elv', 'password','https://domain.example.com/#/calendar/place/6663'));
  });

  afterAll(async () => {
    if (!browser) return;
    await browser.close();
  });

  test('Создание совещания', async () => {
    await page.waitForSelector('#full-nav-menu-add-btn');
    await page.click('#full-nav-menu-add-btn');
    await page.waitForSelector('#create-popup-meeting-btn');
    await page.click('#create-popup-meeting-btn');
    await page.waitForSelector('#meeting-topic');
    await page.click('#meeting-topic');

    const meetingName = new Date().getTime().toString();
    await page.type('#meeting-topic', meetingName);

    await page.waitForSelector('#meeting-place-for-meeting');
    await page.click('#meeting-place-for-meeting');
    await page.type('#meeting-place-for-meeting', 'АВТОТЕСТЫ');
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('Enter');

    await page.waitForSelector('#meeting-approver');
    await page.click('#meeting-approver');
    await page.type('#meeting-approver', 'фамилия имя');
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('Enter');
    await page.click('#work-with-event-form-save-button');

    await page.waitForSelector('#agenda');
    await page.click('#agenda');

    const pageContent = await page.content();
    if (meetingName) {
      expect(pageContent).toContain(meetingName);
      console.log('Совещание успешно создано с заголовком', meetingName);
    } else {
      throw new Error('Элемент названия не найден');
    }
  });
});
