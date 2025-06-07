import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MovieService } from '../../services/movie.service';
import { MovieModel } from '../../models/movie.model';
import { NgFor, NgIf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import {MatInputModule} from '@angular/material/input';
import { MovieReview } from '../../models/movieReview';
import {MatSelectModule} from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { ReserveService } from '../../services/reserve.service';
import { MovieProjection } from '../../models/movieProjection.model';



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
    NgFor,
    MatInputModule,
    MatSelectModule,
    FormsModule
  ],
  templateUrl: './movie.component.html',
  styleUrl: './movie.component.css'
})
export class MovieComponent implements OnInit {

  public movieService: MovieService
  public movie: MovieModel | undefined
  public active: any = null
  public reserveService: ReserveService

  public user: string = ""
  public ocena: number = 0
  public komentar: string = ""

  constructor(private route: ActivatedRoute, private router: Router ){
    this.movieService = MovieService.getInstance()
    this.reserveService = ReserveService.getInstance()
  }

  checkActive(){
    const aktivan = sessionStorage.getItem('active')
    if(aktivan)
      this.active = aktivan
    console.log(aktivan)
  }

  ngOnInit() {
    
    this.route.params.subscribe(param =>{
      let id: number =+ param['id']
      this.movieService.getMovieById(id).subscribe((response) =>{
        this.movie = response
      })
    })
    this.checkActive()
  }

  addComent(){
    // if(this.movie?.projekcija.filter(film=> film.status === 'gledano')){
    //   alert('Niste odgledali film') 
    //   return;
    // }
    const odgledano = localStorage.getItem('gledano') || '[]'
    const filmoviGledani: string[] = JSON.parse(odgledano)
    const naziv = this.movie?.naziv
    if (!naziv) {
      alert('film se ne nalazi u nasoj bazi');
      return;
    }
    if(!filmoviGledani.includes(naziv)){
      alert('niste odgledali film')
      return
    }
    if(!this.ocena || !this.komentar){
      alert('Molimo popunite sva polja')
      return;
    }
    const noviKomentar: MovieReview = {
      user: this.active,
      ocena: this.ocena,
      komentar: this.komentar
    }

    this.movie?.recenzije.push(noviKomentar)
    
    this.komentar = '';
    this.ocena = 0
  
  }

  public reserve(movie: MovieModel, projection: MovieProjection){
    if(!sessionStorage.getItem('active')) {
      this.router.navigate(['/login'])
    } else {
      this.reserveService.reserveTicket(movie, projection)
      this.router.navigate(['/cart'])
    }

  }
}