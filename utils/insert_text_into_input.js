const insertTextIntoInput =  async (page, inputSelector,timePicker) => {
  await page.click(inputSelector);
  await page.keyboard.down('Control');
  await page.keyboard.press('KeyA');
  await page.keyboard.up('Control');
  await page.type(inputSelector, timePicker);
};
module.exports = insertTextIntoInput;


