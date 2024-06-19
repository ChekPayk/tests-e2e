const authorize = require('../../authorize/login');
const createMeeting = require('../../utils/create_meeting');
jest.setTimeout(60000);

describe('Изменение совещания', () => {
  let browser;
  let page;

  beforeAll(async () => {
    ({browser, page} = await authorize('volkova_elv', 'password','https://domain.example.com/#/calendar/place/6663'));
  });

  afterAll(async () => {
    if (!browser) return;
    await browser.close();
  });

  test('Изменение совещания', async () => {
    await createMeeting(page);
    
    await page.waitForSelector('#agenda-appointment-title');
    await page.click('#agenda-appointment-title');
    await page.waitForSelector('#activity-page-actions-bar-edit-btn');
    await page.click('#activity-page-actions-bar-edit-btn');
    await page.waitForSelector('#meeting-topic');
    await page.click('#meeting-topic');
    const meetingNameChanged = 'TEST';
    await page.type('#meeting-topic', meetingNameChanged);
    await page.click('#work-with-event-form-save-button');
    await page.waitForTimeout(3000);
    await page.reload();
    await page.waitForTimeout(3000);

    const pageContent = await page.content();
    if (meetingNameChanged) {
      expect(pageContent).toContain(meetingNameChanged);
      console.log('Совещание успешно создано с заголовком', meetingNameChanged);
    } else {
      throw new Error('Элемент названия не найден');
    }
    await page.waitForTimeout(2000);
    await page.waitForSelector('#more-button');
    await page.click('#more-button');
    await page.waitForSelector('#delete');
    await page.click('#delete');
    await page.waitForSelector('#dialog-on-confirmation-ok-btn');
    await page.click('#dialog-on-confirmation-ok-btn');
  });
});