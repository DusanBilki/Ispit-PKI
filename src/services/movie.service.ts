import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { MovieModel } from '../models/movie.model';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  
  private static instance: MovieService
  private movies: MovieModel[] = []
  private url = '/assets/podaci.json'
  private client: HttpClient
  private constructor(){
    this.client = inject(HttpClient)
  }

  public static getInstance(): MovieService{
    if(MovieService.instance == null)
      MovieService.instance = new MovieService
    return MovieService.instance
  }

  public getMovies(){
    return this.client.get<MovieModel[]>(this.url,{
      headers:{
        'Accepts':'application/json'
      } 
    })
  }

  public getMovieById(id: number){
    return this.client.get<MovieModel[]>(this.url,{
      headers: {
        'Accept': 'application/json'
      }
    }).pipe(map(movies => movies.find(movie => movie.id === id)))
  }
}
