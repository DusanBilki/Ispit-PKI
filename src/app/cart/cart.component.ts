import { Component, OnInit } from '@angular/core';
import { ReserveService } from '../../services/reserve.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ReserveModel } from '../../models/reserve.model';
import { MatButtonModule } from '@angular/material/button';
import { NgFor, NgIf } from '@angular/common';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [
    MatTableModule,
    MatButtonModule,
    NgIf,
    NgFor
  ],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {

  private reservetaionService: ReserveService
  private userService: UserService


  displayedColumns: string[] = ['naziv', 'cena','akcija']
  dataSource: MatTableDataSource<ReserveModel>

  constructor(){
    this.reservetaionService = ReserveService.getInstance()
    this.dataSource = new MatTableDataSource(this.getCart())
    this.userService = UserService.getInstance()
  }
  ngOnInit(): void {
    this.checkLogin()
  }

  public userActive: any = undefined

  checkLogin(): void {
    const userIs = sessionStorage.getItem('active')
    if(!userIs){
      window.location.href = '/login'
    }

  }
  

  

  getCart(): ReserveModel[]{
    return this.reservetaionService.getCart()
  }

  getTicketPrice(reserved: ReserveModel): number{
    const reservedProjection = reserved.movie.projekcija.filter(movie =>{
      movie.status === 'rezervisano'
    })

    return reservedProjection.length > 0 ? reservedProjection[0].cena : 0
  }

  getTotalPrice(): number{
    return this.reservetaionService.calculateTotalPrice()
  }

  remove(reserved: ReserveModel): void {
    this.reservetaionService.removeFromCart(reserved)
    this.dataSource.data = this.getCart()
  } 

  buy(){
    const cartMovies = this.reservetaionService.getCart()
    let gledaniFilmovi = JSON.parse(localStorage.getItem('odgledani') || '[]')

    cartMovies.forEach(reservation => {
      reservation.movie.projekcija.forEach(movie =>{
        if(movie.status === 'rezervisano'){
          movie.status = 'gledano'
          gledaniFilmovi.push(movie)
        }
      })
    })
    localStorage.setItem('odgledani', gledaniFilmovi )
    this.reservetaionService.clearCart()
    this.dataSource.data = this.getCart()
  }
}
