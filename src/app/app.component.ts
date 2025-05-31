import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { UserService } from '../services/user.service';
import { NgIf } from '@angular/common';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    RouterLink,
    NgIf
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  ngOnInit() {
    const userActive = sessionStorage.getItem('active');
    if(userActive){
      this.activeUser = userActive
    }
    //console.log('app.component ngOnInit', userActive)
  }
  title = 'Ispit-PKI';

   activeUser: any = null;

   private userService: UserService

   constructor(){
    this.userService = UserService.getInstance()
   }

   public doLogout(){
    this.userService.logout()
   }
   //zasto ne moze function name(params){}
   //hocu da se prikaze login dugme samo ako !activeUser
}
