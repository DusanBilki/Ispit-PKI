import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { ReserveModel } from '../models/reserve.model';
import { MovieModel } from '../models/movie.model';
import { MovieProjection } from '../models/movieProjection.model';
import { UserModel } from '../models/user.model';

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
  public user: UserModel | undefined
  private reservations: ReserveModel[] = []


  public addToCart(movie: ReserveModel){
    this.reservations.push(movie)
    localStorage.setItem('rezervacije', JSON.stringify(this.reservations))
  }

  public getCart(): ReserveModel[]{
    const podaci = localStorage.getItem('rezervacije')
    this.reservations = podaci ? JSON.parse(podaci) : [];
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
   this.reservations = this.reservations.filter(movies => movies !== movie)
   localStorage.setItem('rezervacije', JSON.stringify(this.reservations))
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
    localStorage.removeItem('rezervacije')
  }
}
