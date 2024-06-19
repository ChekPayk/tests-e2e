const authorize = require('../authorize/login');
jest.setTimeout(70000);
describe('Скачивание всех вложений', () => {
  let browser;
  let page;

  beforeAll(async () => {
    ({
      browser,
      page,
    } = await authorize('volkova_elv', 'password', 'https://domain.example.com/#/document/10044370/fromFolder=10000013'));
  });

  afterAll(async () => {
    if (!browser) return;
    await browser.close();
  });

  test('Скачать все вложения', async () => {
    try {
      const downloadButtonSelector = '#document-attachments-download-all-attachments';
      await page.waitForSelector(downloadButtonSelector, {visible: true});
      await page.evaluate((selector) => {
        document.querySelector(selector).addEventListener('click', () => {
          window.downloadStarted = true;
        });
      }, downloadButtonSelector);

      await page.click(downloadButtonSelector);
      await page.waitForTimeout(10000);
      await page.click(downloadButtonSelector);
      await page.waitForTimeout(10000);
      const downloadStarted = await page.evaluate(() => window.downloadStarted);
      if (downloadStarted) {
        console.log('Загрузка файлов началась');
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

