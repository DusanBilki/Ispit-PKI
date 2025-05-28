import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  public userService: UserService

  public email: string = ''
  public password: string = ''

  constructor(private router: Router, private route: ActivatedRoute){
    this.userService = UserService.getInstance()
  }

  public updateEmail(e:any){
    this.email = e.target.value
  }

  public updatePassword(e: any){
    this.password = e.target.value
  }

  public doLogin(){
    if(this.email == '' || this.password == ''){
      alert('Username or password is empty')
      return
    }
    try{
      this.userService.login(this.email, this.password)
      this.router.navigate(['/profile'], {relativeTo: this.route})
    }catch(e){
      alert(e)
    }
  }
}
