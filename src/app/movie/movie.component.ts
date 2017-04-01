import { Component, Input } from '@angular/core';
import { Movie } from "app/movie";

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent{
  @Input() movie: Movie;
  isRatingVisible: boolean = false;

 toggleRatings(isVisible: boolean) {
   this.isRatingVisible = isVisible;
  }
}
