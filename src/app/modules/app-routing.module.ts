import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from '../components/main/main/main.component';
import { LoginComponent } from '../components/login/login/login.component';
import { RegisterComponent } from '../components/login/register/register.component';
import { NotFoundComponent } from '../components/not-found/not-found.component';
import { AuthGuard } from '../services/guards/auth.guard';


const routes: Routes = [
  { path: '', redirectTo : 'main' ,pathMatch:'full'},
  { path: 'home', redirectTo: ''},
  { path: 'main', component: MainComponent, canActivate:[AuthGuard] },
  { path: 'login', component: LoginComponent, canActivate:[AuthGuard]},
  { path: 'register', component : RegisterComponent, canActivate:[AuthGuard]},
  { path: '**', component: NotFoundComponent, canActivate:[AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
