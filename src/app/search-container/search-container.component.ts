import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { DataService } from '../../services/data.service';
import { MovieService } from '../../services/movie.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieModel } from '../../models/movie.model';
import { NgFor, NgIf } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { SearchComponent } from '../search/search.component';

@Component({
  selector: 'app-search-container',
  standalone: true,
  imports: [NgIf,
    NgFor,
    MatCardModule,
    MatButtonModule,
    MatListModule,
    MatSelectModule
  ],
  templateUrl: './search-container.component.html',
  styleUrl: './search-container.component.css'
})
export class SearchContainerComponent implements OnInit {

  @Output() onSearch: EventEmitter<any> = new EventEmitter()
  public dataService: DataService
  public movieService: MovieService
  public movies: MovieModel[] = []

  public sNaziv: string | null
  public sZanr: string | null
  public sCena: number | null

  constructor(private router: Router, private route: ActivatedRoute){
    this.dataService = DataService.getInstance()
    this.movieService = MovieService.getInstance()
    

    const criteria = this.dataService.getSearchCriteria()
    this.sNaziv = criteria.nazivSearch
    this.sCena = criteria.cenaSearch
    this.sZanr = criteria.zanrSearch
  }

  ngOnInit(): void {
   this.movieService.getMovies().subscribe(response =>{
    this.movies = response
   })
  }

  public doSearch(){
    this.dataService.saveSearchCriteria({
      nazivSearch: this.sNaziv,
      zanrSearch: this.sZanr,
      cenaSearch: this.sCena
    })
  if(this.router.url != '/search'){
    this.router.navigate(['/search'], {relativeTo:this.route })
    return
  }
  this.onSearch.emit()
  }
}
