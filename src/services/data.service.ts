import { Injectable } from '@angular/core';
import { SearchModel } from '../models/search.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private static instance: DataService
  constructor() { }

  public static getInstance(): DataService{
    if(DataService.instance == null){
      DataService.instance = new DataService()
    }
    return DataService.instance
  }

  public getZanr(): string[]{
    return [
      'Action', 'Thriller/Drama', 'War', 'Horror'
    ]
  }

  public getCena(): number[]{
    return [
      500, 800, 1000
    ]
  }

  public getSearchCriteria(): SearchModel {
    if(!sessionStorage.getItem('search')){
      sessionStorage.setItem('search', JSON.stringify({
        naziv: null,
        zanr: null,
        cena: null
      }))
    }
    return JSON.parse(sessionStorage.getItem('search')!)
  }

  public saveSearchCriteria(search: SearchModel){
    sessionStorage.setItem('search', JSON.stringify(search))
  }


  
}
