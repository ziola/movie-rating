import { Component, OnInit } from '@angular/core';
import { Movie } from './../movie';
import { MoviesService } from './../movies.service';

@Component({
  selector: 'app-movies',
  host: { 'class': 'row' },
  template: `
    <!-- That should be another component -->
    <div class="row right-align">
      <span>Titles: </span>
      <span class="clickable" *ngIf="sort === 'asc'" (click)="setSort('desc')" >ascending</span>
      <span class="clickable" *ngIf="sort === 'desc'" (click)="setSort('asc')">descending</span>
     </div>
      <hr />
      <app-movie
        *ngFor="let movie of movies"
        [movie]=movie
        class="col s12 m6 l4"
      ></app-movie>
  `,
  styles: [`
  .clickable {
    cursor: pointer;
  }
  `]
})
export class MoviesComponent implements OnInit {

  sort: string = 'asc';
  movies: Movie[];

  constructor(private moviesService: MoviesService) { };

  ngOnInit(): void {
    this.moviesService
      .getMovies(this.sort === 'asc')
      .then(movies => this.movies = movies);
  }

  setSort(newSort) {
    if (newSort === this.sort) {
      return;
    }
    this.sort = newSort;
    this.moviesService
      .getMovies(this.sort === 'asc')
      .then(movies => this.movies = movies);
  }

}
