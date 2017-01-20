import { FlagshipAppPage } from './app.po';

describe('flagship-app App', function() {
  let page: FlagshipAppPage;

  beforeEach(() => {
    page = new FlagshipAppPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
