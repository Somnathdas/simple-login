import { SimpleLoginAppPage } from './app.po';

describe('simple-login-app App', () => {
  let page: SimpleLoginAppPage;

  beforeEach(() => {
    page = new SimpleLoginAppPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
