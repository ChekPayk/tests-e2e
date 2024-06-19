const authorize = require('../authorize/login');
jest.setTimeout(30000);
describe('Скачивание вложений в ОДО', () => {
  let browser;
  let page;

  beforeAll(async () => {
    ({browser, page,} = await authorize('volkova_elv', 'password', 'https://domain.example.com/#/document/10044370/fromFolder=10000013'));
  });

  afterAll(async () => {
    if (!browser) return;
    await browser.close();
  });

  test('Скачивание вложений для отправки у ОДО', async () => {
    try {
      const downloadButtonSelector = '#action-buttons-download-all-for-send-btn';
      await page.waitForSelector(downloadButtonSelector, {visible: true});
      await page.evaluate((selector) => {
        document.querySelector(selector).addEventListener('click', () => {
          window.downloadStarted = true;
        });
      }, downloadButtonSelector);

      await page.click(downloadButtonSelector);
      await page.waitForTimeout(5000);
      const downloadStarted = await page.evaluate(() => window.downloadStarted);
      if (downloadStarted) {
        console.log('Загрузка файлов началась.');
      } else {
        console.log('Загрузка файлов не началась.');
      }

    } catch (error) {
      console.error('Произошла ошибка:', error);
    } finally {
      await browser.close();
    }

  });
});