import { Component, OnInit, Input } from '@angular/core';
import { Movie } from "app/movie";
import { MoviesService } from "app/movies.service";
import { Rating } from "app/rating";

@Component({
  selector: 'app-movie-rating',
  templateUrl: './movie-rating.component.html',
  styleUrls: ['./movie-rating.component.css']
})
export class MovieRatingComponent implements OnInit {
  @Input() movie: Movie;
  avgRating: number;
  userRating: string = '3';
  distribution: number[];
  ratings: Rating[] = [];
  availableRatings: number[] = [1,2,3,4,5];

  constructor(
    private moviesService: MoviesService,
  ) { }

  ngOnInit() {
    this.moviesService.getRatings(this.movie.id)
      .then(ratings => {
        this.ratings = ratings;
        this.distribution = this.ratingsDistribution(ratings);
        this.avgRating = this.ratingsAverage(ratings);
      });
  }

  onRateClicked(rating) {
    this.moviesService
      .rate(this.movie.id, rating)
      .then(newRating => {
        this.ratings = [...this.ratings, newRating];
        this.distribution = this.ratingsDistribution(this.ratings);
        this.avgRating = this.ratingsAverage(this.ratings);
      });
  }

  ratingsDistribution(ratings = []): number[] {
    return ratings.reduce((distribution, val: Rating) => {
      distribution[val.rating - 1]++;
      return distribution;
    }, [0, 0, 0, 0, 0]);
  }

  ratingsAverage(ratings = []): number {
    const sum = ratings.reduce((sum, val) => sum + val.rating, 0);
    return sum / ratings.length;
  }

  getRatingPercentage(rating: number): string {
    const percentage = rating / this.ratings.length * 100;
    return `${percentage}%`;
  }

}
