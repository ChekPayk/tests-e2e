const authorize = require('../authorize/login');
const logout = require('../authorize/logout');
jest.setTimeout(10000);
describe('Авторизация по логину и паролю', () => {
  let browser;
  let page;

  beforeAll(async () => {
    ({browser, page} = await authorize('volkova_elv', 'password'));
  });

  afterAll(async () => {
    if (!browser) return;
    await browser.close();
  });

  test('Мы попали на страницу ЭДО', async () => {

    const isEdoPresent = await page.evaluate((expectedText) => {
      return document.body.textContent.includes(expectedText);
    }, 'ЭДО');
    await expect(isEdoPresent).toBe(true);
  });
  
  test('Мы  вышли', async () => {
    ({page} = await logout(page));
    const isWelcomePresented = await page.evaluate((expectedText) => {
      return document.body.textContent.includes(expectedText);
    }, 'Добро пожаловать на ');
    await expect(isWelcomePresented).toBe(true);
  });
});