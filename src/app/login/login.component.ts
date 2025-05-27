import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
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
