import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MovieComponent } from './movie/movie.component';
import { SearchComponent } from './search/search.component';
import { LoginComponent } from './login/login.component';

export const routes: Routes = [
    {path: '', component:HomeComponent},
    {path: 'movie/:id', component: MovieComponent},
    {path: 'search', component: SearchComponent},
    {path: 'login', component: LoginComponent},
    {path: '**', redirectTo: ''}
];
