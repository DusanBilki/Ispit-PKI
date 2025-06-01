import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { ReserveModel } from '../models/reserve.model';
import { MovieModel } from '../models/movie.model';
import { MovieProjection } from '../models/movieProjection.model';

@Injectable({
  providedIn: 'root'
})
export class ReserveService {

  private static instance: ReserveService
  private userService: UserService

  public static getInstance(){
    if(ReserveService.instance == null)
      ReserveService.instance = new ReserveService
    return ReserveService.instance
  }
  constructor() { 
    this.userService = UserService.getInstance()
  }

  private reservations: ReserveModel[] = []


  public addToCart(movie: ReserveModel){
    this.reservations.push(movie)
  }

  public getCart(): ReserveModel[]{
    return this.reservations
  }


  public reserveTicket(movie:MovieModel, projection: MovieProjection){
    projection.status = 'rezervisano'
    const booked = {
      movie: movie
    }
    const currentUser = this.userService.getCurrentUser()

    if(!currentUser.rezervacije.includes(movie.naziv)){
      currentUser.rezervacije.push(movie.naziv)
      this.userService.updateUser(currentUser)
    }

    this.addToCart(booked)
    alert(`Rezervisan ${movie.naziv}`)

  }

  public removeFromCart(movie: ReserveModel){
    this.getCart().filter(movies => {movies !== movie})
  }

  calculateTotalPrice(): number {
    return this.reservations.reduce((total, reservation) =>{
      const show = reservation.movie.projekcija.find(project =>
        project.status === 'rezervisano'
      )
      return total + (show ? show.cena : 0);
    }, 0)
  }

  public clearCart(): void{
    this.reservations = []
  }
}
