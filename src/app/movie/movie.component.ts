import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MovieService } from '../../services/movie.service';
import { MovieModel } from '../../models/movie.model';
import { NgFor, NgIf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-movie',
  standalone: true,
  imports: [
    RouterLink,
    NgIf,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatListModule,
    NgFor

  ],
  templateUrl: './movie.component.html',
  styleUrl: './movie.component.css'
})
export class MovieComponent implements OnInit {

  public movieService: MovieService
  public movie: MovieModel | undefined
  
  constructor(private route: ActivatedRoute, private router: Router ){
    this.movieService = MovieService.getInstance()
  }

  ngOnInit() {
    
    this.route.params.subscribe(param =>{
      let id: number =+ param['id']
      this.movieService.getMovieById(id).subscribe((response) =>{
        this.movie = response
      })
    })

  }

}
