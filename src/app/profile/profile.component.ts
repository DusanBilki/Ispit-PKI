import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { MovieService } from '../../services/movie.service';
import { UserModel } from '../../models/user.model';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { NgFor, NgIf } from '@angular/common';
import { ReserveService } from '../../services/reserve.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [MatCardModule,
    MatListModule,
    RouterLink,
    NgIf,
    NgFor

  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit{
  private userService: UserService
  public movieService: MovieService
  public reserverService: ReserveService
  public user: UserModel | undefined
  public rezervisaniFilmovi: any[] = []
  ngOnInit(): void {
      this.user = this.userService.getCurrentUser()
      if(this.user == undefined){
        this.router.navigate(['/login'], {relativeTo: this.route})
      }
      this.loadReserved()
  }

  constructor(private router: Router, private route: ActivatedRoute){
    this.userService = UserService.getInstance()
    this.movieService = MovieService.getInstance()
    this.reserverService = ReserveService.getInstance()
  }

  public getAvatarUrl(){
    return 'https://ui-avatars.com/api/?name=' + this.user?.ime
  }

  public loadReserved(){
    const rezervisani = this.reserverService.getCart()
    this.rezervisaniFilmovi = rezervisani
  }

}
