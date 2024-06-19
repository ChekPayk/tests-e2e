const authorize = require('../../authorize/login');
jest.setTimeout(10000);
describe('Открытие страницы задач', () => {
  let browser;
  let page;

  beforeAll(async () => {
    ({browser, page} = await authorize('volkova_elv', 'password','https://domain.example.com/#/missions'));
  });

  afterAll(async () => {
    if (!browser) return;
    await browser.close();
  });

  test('Открывается страница задач с текстом "СОЗДАТЬ ЗАДАЧУ"', async () => {
    const isCreateMissionButtonExists = await page.evaluate((expectedText) => {
      return document.body.textContent.includes(expectedText);
    }, 'СОЗДАТЬ ЗАДАЧУ');
    await expect(isCreateMissionButtonExists).toBe(true);
  });
});