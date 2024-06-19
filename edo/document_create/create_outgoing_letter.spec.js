const authorize = require('../../authorize/login');
jest.setTimeout(30000);
describe('Создание исходящего письма', () => {
  let browser;
  let page;

  beforeAll(async () => {
    ({browser, page} = await authorize('volkova_elv', 'password', 'https://domain.example.com/#/create/outgoing_letter/1'));
  });

  afterAll(async () => {
    if (!browser) return;
    await browser.close();
  });

  test('Создание с/з', async () => {
    await page.waitForSelector('#outgoing-letter-information-subject');
    await page.click('#outgoing-letter-information-subject');
    await page.type('#outgoing-letter-information-subject', 'TEST');
    await page.click('#outgoing-letter-information-nomenclature');
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('Enter');
    await page.click('#outgoing-letter-information-document-signer');
    await page.type('#outgoing-letter-information-document-signer','фамилия имя');
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('Enter');
    await page.click('#outgoing-letter-information-internal-signer');
    await page.type('#outgoing-letter-information-internal-signer','фамилия имя');
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('Enter');
    await page.click('#outgoing-letter-information-next-button');
    await page.waitForSelector('#external-addressee-tree-view-select-button');
    await page.click('#external-addressee-tree-view-select-button');
    await page.click('#external-addressee-edit-dialog-job-title');
    await page.type('#external-addressee-edit-dialog-job-title','Начальнику');
    await page.click('#external-addressee-edit-dialog-name');
    await page.type('#external-addressee-edit-dialog-name','Фамилия И.О.');
    await page.click('#external-addressee-edit-dialog-address');
    await page.type('#external-addressee-edit-dialog-address','г. Москва ул. Краснопартизанская 17');
    await page.click('#external-addressee-edit-dialog-job-ok-button');
    await page.click('#outgoing-letter-addressee-next-button');
    await page.waitForSelector('.dxreTableCursors');
    await page.keyboard.type('Hello, World!');
    await page.click('#document-action-buttons-send-for-approval');
    await page.waitForNavigation();
    // Проверка совпадения заголовка
    const pageTitle=await page.title('.panel-subtitle');
    const expectedTitle='Исходящие';
    console.log('Текущий заголовок страницы:', pageTitle);
    expect(pageTitle).toBe(expectedTitle);
  });
});