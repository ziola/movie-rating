import { MovieRatingPage } from './app.po';

describe('movie-rating App', () => {
  let page: MovieRatingPage;

  beforeEach(() => {
    page = new MovieRatingPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
