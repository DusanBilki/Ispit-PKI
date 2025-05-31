import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    RouterLink
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

    public ime: string = ''
    public prezime: string = ''
    public email: string = ''
    public telefon: string = ''
    public adresa: string = ''
    public user: string = ''
    public password: string = ''
    public confrimPassword: string = ''

    private userService: UserService

    constructor(private router: Router, private route: ActivatedRoute){
      this.userService = UserService.getInstance()
    }

    public updateIme(e: any){
      this.ime = e.target.value
    }
    public updatePrezime(e: any){
      this.prezime = e.target.value
    }
    public updateEmail(e: any){
      this.email = e.target.value
    }
    public updateTelefon(e: any){
      this.telefon = e.target.value
    }
    public updateAdresa(e: any){
      this.adresa = e.target.value
    }
    public updateUser(e: any){
      this.user = e.target.value
    }
    public updatePassword(e: any){
      this.password = e.target.value
    }
    public updateConfirm(e: any){
      this.confrimPassword = e.target.value
    }

    public doRegister(){
     
      if(this.password !== this.confrimPassword){
        alert('sifre se ne poklapaju')
        return
      }
      try{
        this.userService.createUser({
          ime: this.ime,
          prezime: this.prezime,
          email: this.email,
          telefon: this.telefon,
          adresa: this.adresa,
          omiljeniFilmovi: [],
          user: this.user,
          password: this.password,
          rezervacije: []
        })
      } catch(e){
        alert(e)
        return
      }

      this.router.navigate(['/login'], {relativeTo: this.route})
    }
}


// ime: string
//     prezime: string
//     email: string
//     telefon: string
//     adresa: string
//     omiljeniFilmovi: []
//     user: string
//     password: string
//     rezervacije: string[]