import { Component, OnInit } from '@angular/core';
import { ReserveService } from '../../services/reserve.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ReserveModel } from '../../models/reserve.model';
import { MatButtonModule } from '@angular/material/button';
import { NgFor, NgIf } from '@angular/common';
import { UserService } from '../../services/user.service';
import { MatCardModule } from '@angular/material/card';
import { UserModel } from '../../models/user.model';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [
    MatTableModule,
    MatButtonModule,
    NgIf,
    NgFor,
    MatCardModule
  ],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {

  private reservetaionService: ReserveService
  private userService: UserService
  private user: UserModel | undefined

  displayedColumns: string[] = ['naziv', 'cena','akcija']
  dataSource: MatTableDataSource<ReserveModel> = new MatTableDataSource();

  constructor(){
    this.reservetaionService = ReserveService.getInstance()
    this.userService = UserService.getInstance()
  }
  ngOnInit(): void {
    this.checkLogin()
    const rezervisano = this.reservetaionService.getCart()
    this.dataSource.data = rezervisano
    this.user = this.userService.getCurrentUser()
  }

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
    const reservedProjection = reserved.movie.projekcija.filter(projection =>
      projection.status === 'rezervisano'
    )
    //console.log(reservedProjection)
    return reservedProjection[0].cena
  }

  getTotalPrice(): number{
    return this.reservetaionService.calculateTotalPrice()
  }

  remove(reserved: ReserveModel): void {
    this.reservetaionService.removeFromCart(reserved)
    this.dataSource.data = this.getCart()
  } 

  buyFromCart(){
    const cartMovies = this.getCart()
    let kupljeni: string[] = []
    cartMovies.forEach(reservation => {
      reservation.movie.projekcija.forEach(movie =>{
        if(movie.status === 'rezervisano'){
          movie.status = 'gledano'
          kupljeni.push(reservation.movie.naziv)
        }
      })
    })
    localStorage.setItem('gledano', JSON.stringify(kupljeni))
    this.reservetaionService.clearCart()
    this.dataSource.data = this.getCart()
  }
}
