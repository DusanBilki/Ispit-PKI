import { Component, OnInit } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import { MovieService } from '../../services/movie.service';
import { MovieModel } from '../../models/movie.model';
import { Router, RouterLink } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import { SearchContainerComponent } from "../search-container/search-container.component";
import { ReserveService } from '../../services/reserve.service';
import { ReserveModel } from '../../models/reserve.model';
import { MovieProjection } from '../../models/movieProjection.model';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    NgFor,
    NgIf,
    MatIconModule,
    RouterLink,
    SearchContainerComponent
],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  
  private reserveService: ReserveService
  private service: MovieService
  public movies: MovieModel[] = []

  activeUser: any = null

  constructor(private router: Router){
    this.service = MovieService.getInstance()
    this.reserveService = ReserveService.getInstance()
  }

  ngOnInit(): void {
    this.service.getMovies().subscribe(
      (response) => {
        this.movies = response
      }
    )
    // const userActive = sessionStorage.getItem('active')
    // if(userActive){
    //   this.activeUser = userActive;
    // }
    const userInfo = localStorage.getItem('users')
    if(userInfo){
      const users = JSON.parse(userInfo)
      const prviUser = users[0]
      this.activeUser = prviUser

    }
  }
  public reserve(movie: MovieModel, projection: MovieProjection){
    const active = sessionStorage.getItem('active')
    if(!active) this.router.navigate(['/login'])

    this.reserveService.reserveTicket(movie, projection)
    this.router.navigate(['/cart'])
  }


}
