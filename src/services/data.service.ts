import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private static instance: DataService
  constructor() { }

  public static getInstance(){
    if(DataService.instance == null){
      DataService.instance = new DataService()
    }
    return DataService.instance
  }

  public getZanr(): string[]{
    return [
      'Action', 'Thriller/Drama', 'War'
    ]
  }
}
