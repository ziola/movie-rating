import { Injectable } from '@angular/core';
import { Movie } from "app/movie";
import { Http } from "@angular/http";

import 'rxjs/add/operator/toPromise';
import { Rating } from "app/rating";

const MOVIES_URL = 'https://movie-ranking.herokuapp.com/movies/';
const RATINGS_URL_PART = 'ratings';

@Injectable()
export class MoviesService {

  constructor(private http: Http) { }

  private movies: Movie[];

  getMovies(sortAsc: boolean = true): Promise<Movie[]> {
    if (this.movies) {
      return Promise.resolve(this.movies.sort(sortAsc ? this.sortAsc : this.sortDesc));
    }
    return this.http.get(MOVIES_URL)
      .toPromise()
      .then(response => response.json() as Movie[])
      .then(movies => this.movies = movies)
      .then(movies => movies.sort(sortAsc ? this.sortAsc : this.sortDesc))
      .catch(this.handleError);
  }

  getRatings(movieId: number): Promise<Rating[]> {
    return this.http.get(this.ratingsUrl(movieId))
      .toPromise()
      .then(response => response.json() as Rating[])
      .catch(this.handleError);
  }

  rate(movieId: number, rating: number): Promise<Rating> {
    return this.http.post(
      this.ratingsUrl(movieId),
      { rating: rating }
    ).toPromise()
      .then(response => response.json() as Rating)
      .catch(this.handleError);
  }

  private ratingsUrl(movieId: number): string {
    return `${MOVIES_URL}${movieId}/${RATINGS_URL_PART}`
  }

  private sortAsc(a: Movie, b: Movie): number {
    return a.title.toLocaleLowerCase().localeCompare(b.title.toLocaleLowerCase());
  }

  private sortDesc(a: Movie, b: Movie): number {
    return b.title.toLocaleLowerCase().localeCompare(a.title.toLocaleLowerCase());
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

}
