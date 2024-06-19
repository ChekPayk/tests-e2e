const authorize = require('../../authorize/login');
jest.setTimeout(40000);
describe('Создание с/з', () => {
  let browser;
  let page;

  beforeAll(async () => {
    ({browser, page} = await authorize('volkova_elv', 'password', 'https://domain.example.com/#/create/memo/1/1'));
  });

  afterAll(async () => {
    if (!browser) return;
    await browser.close();
  });

  test('Создание с/з', async () => {
    await page.waitForSelector('#document-create-information-subject');
    await page.click('#document-create-information-subject');
    await page.type('#document-create-information-subject', 'TEST');
    await page.click('#document-create-information-signer');
    await page.type('#document-create-information-signer', 'фамилия имя');
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('Enter');
    await page.click('#document-create-next-button');
    await page.waitForSelector('.theme_addressee');
    const checkboxIcons=await page.$$('.dx-checkbox-icon');
    await checkboxIcons[1].click();
    await page.click('#document-create-next-button');
    await page.waitForSelector('.dxreTableCursors');
    await page.keyboard.type('Hello, World!');
    await page.click('#document-action-buttons-send-for-approval');
    await page.waitForNavigation();
    // Проверка совпадения заголовка
    const pageTitle=await page.title('.panel-subtitle');
    const expectedTitle='Исходящие';
    console.log('Текущий заголовок страницы:', pageTitle);
    expect(pageTitle).toBe(expectedTitle);
    // Проверка наличия дока в гриде
    // const documentName='TEST';
    // const isDocumentVisible=await page.waitForSelector('.text-ellipsis full-width');
    // expect(isDocumentVisible).toBeTruthy();
    });
  });