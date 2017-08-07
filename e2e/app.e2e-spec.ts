import { BizrightExcelPage } from './app.po';

describe('bizright-excel App', () => {
  let page: BizrightExcelPage;

  beforeEach(() => {
    page = new BizrightExcelPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
