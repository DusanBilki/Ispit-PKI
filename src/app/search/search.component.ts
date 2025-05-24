import { Component, OnInit } from '@angular/core';
import { MovieModel } from '../../models/movie.model';
import { DataService } from '../../services/data.service';
import { MovieService } from '../../services/movie.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { SearchContainerComponent } from "../search-container/search-container.component";
import { NgFor, NgIf } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
@Component({
  selector: 'app-search',
  standalone: true,
  imports: [SearchContainerComponent,
    NgIf,
    NgFor,
    MatCardModule,
    MatTableModule,
    RouterLink,
    MatButtonModule,
    MatListModule,
    MatSelectModule
  ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent implements OnInit {


  public movieService: MovieService
  public dataService: DataService

  public movies: MovieModel[] = []
  public movie: MovieModel | undefined = undefined

  public displayedColumns = ['Naziv', 'Zanr', 'Cena']
  public dataSource: MatTableDataSource<MovieModel> | null = null

  constructor() {
    this.dataService = DataService.getInstance()
    this.movieService = MovieService.getInstance()
  }


  ngOnInit(): void {
    const criteria = this.dataService.getSearchCriteria()

    if (criteria.nazivSearch)
      this.loadTableData(criteria.nazivSearch)
  }

  public doSearch() {
    const criteria = this.dataService.getSearchCriteria()

    
  }


  private loadTableData(genre: string) {
    this.movieService.getMovieByName(genre).subscribe(movie =>{
      this.movie = movie
      this.dataSource = new MatTableDataSource<MovieModel>()
    })
  }
}
