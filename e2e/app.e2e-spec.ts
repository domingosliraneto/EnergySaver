import { EnergySaverPage } from './app.po';

describe('energy-saver App', () => {
  let page: EnergySaverPage;

  beforeEach(() => {
    page = new EnergySaverPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
