import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { MovieService } from '../../services/movie.service';
import { UserModel } from '../../models/user.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit{
  private userService: UserService
  public movieService: MovieService
  public user: UserModel | undefined

  ngOnInit(): void {
      this.user = this.userService.getCurrentUser()
      if(this.user == undefined){
        this.router.navigate(['/login'], {relativeTo: this.route})
      }
  }

  constructor(private router: Router, private route: ActivatedRoute){
    this.userService = UserService.getInstance()
    this.movieService = MovieService.getInstance()
  }

  public getAvatarUrl(){
    return 'https://ui-avatars.com/api/?name=' + this.user?.ime
  }

}
