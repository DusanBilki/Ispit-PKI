import { Component, OnInit, ViewChild, inject } from '@angular/core';
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
import { HttpClientModule } from '@angular/common/http';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';


@Component({
  selector: 'app-search',
  standalone: true,
  imports: [MatCardModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatPaginatorModule,
    MatTableModule,
    MatSortModule,
    HttpClientModule,
    NgIf,
    NgFor,
    RouterLink,
    SearchContainerComponent
  ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent implements OnInit {


  public movieService: MovieService
  public dataService: DataService

  public movies: MovieModel[] = []
  public movie: MovieModel | undefined = undefined
  
  
  
  constructor() {
    this.dataService = DataService.getInstance()
    this.movieService = MovieService.getInstance()
  }
  ngOnInit(): void {
    this.dataService.getSearchCriteria()
    this.loadTableData()
    this.doSearch()
  }

  // ngOnInit(): void {
  //   const criteria = this.dataService.getSearchCriteria()

  //   if (criteria.nazivSearch)
  //     this.loadTableData()
  // }

  displayedColumns = ['position', 'name', 'genre', 'price', 'info']
  public dataSource: MatTableDataSource<MovieModel> | null = null
  @ViewChild(MatPaginator) paginator: MatPaginator | null = null
  @ViewChild(MatSort)
  sort: MatSort = new MatSort;

  public doSearch() {
    const criteria = this.dataService.getSearchCriteria()
    const selectedMovieName = criteria.nazivSearch
    const selectedMovieGenre = criteria.zanrSearch
    const selectedMoviePrice = criteria.cenaSearch
    
    const filteredMovies = this.movies.filter(movie =>{
      const matchesName = selectedMovieName ? movie.naziv === selectedMovieName : false
      const matchesGenre = selectedMovieGenre ? movie.zanr === selectedMovieGenre : false
      const matchesPrice = selectedMoviePrice ? movie.projekcija.some(p => p.cena == selectedMoviePrice) : false

      if(!selectedMovieName && !selectedMovieGenre && !selectedMoviePrice)
        return true

      return matchesName || matchesGenre || matchesPrice
    });
    this.dataSource = new MatTableDataSource<MovieModel>(filteredMovies)
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    }

    private loadTableData(){
      this.movieService.getMovies().subscribe(rsp =>{
        this.movies = rsp
        this.dataSource = new MatTableDataSource<MovieModel>(this.movies)
        this.dataSource.paginator = this.paginator
        this.dataSource.sort = this.sort
      })
    }
   }




  // public announceSortChange(sortState: Sort){
  //   return
  // }
