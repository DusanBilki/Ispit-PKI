import { Injectable } from '@angular/core';
import { UserModel } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private static instance: UserService

  constructor() { }

  public static getInstance() {
    if (UserService.instance == null)
      return UserService.instance = new UserService

    return this.instance
  }

  private retrieveAllUsers(): UserModel[] {
    let json = localStorage.getItem('users')
    if (json == null) {
      const defaultUser = {
        ime: 'dusan',
        prezima: 'bilkan',
        email: 'dusan@gmail.com',
        password: '1234',
        telefon: '1234',
        adresa: 'adresa 1',
        omiljeniFilmovi: ['Godfather'],
        rezervisaniFilmovi: ['Hair', 'Godfather']
      }
      localStorage.setItem('users', JSON.stringify([defaultUser]))
      json = localStorage.getItem('users')
    }

    return JSON.parse(json!)
  }

  public createUser(model: UserModel) {
    const arr = this.retrieveAllUsers()
    if (arr.find(user => user.email === model.email))
      throw new Error('EMAIL_ALREADY_EXISTS')

    arr.push(model)
    localStorage.setItem('users', JSON.stringify(arr))
  }

  public login(email: string, password: string) {
    const arr = this.retrieveAllUsers()
    const usr = arr.find(user => user.email === email && user.password === password)

    if (usr == undefined)
      throw new Error('LOGIN_FAILED')

    sessionStorage.setItem('active', usr.email)
  }

  public getCurrentUser() {
    if (!sessionStorage.getItem('active'))
      throw new Error('NO_ACTIVE_USER')
    const email = sessionStorage.getItem('active')
    const arr = this.retrieveAllUsers()
    const usr = arr.find(user => user.email === email)

    if (usr == undefined)
      throw new Error('NO_ACTIVE_USER')

    return usr
  }

  public hasCurrentUser() {
    return sessionStorage.getItem('active')
  }

  public changePassword(password: string) {
    const active = this.getCurrentUser()
    active.password = password

    var all = this.retrieveAllUsers()
    for (let i = 0; i < all.length; i++) {
        if (all[i].email == active.email) {
            all[i].password = password
        }
    }
    localStorage.setItem('users', JSON.stringify(all))
  }

  public updateUser(model: UserModel){
    var all = this.retrieveAllUsers()
    for(let i=0; i < all.length; i++){
      if(all[i].email == model.email)
        all[i] = model
    }
    localStorage.setItem('users', JSON.stringify(all))
  }

  public logout(){
    sessionStorage.removeItem('active')
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
//     rezervacije: []