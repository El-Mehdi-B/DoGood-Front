import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from '../components/main/main/main.component';
import { LoginComponent } from '../components/login/login/login.component';
import { RegisterComponent } from '../components/login/register/register.component';
import { NotFoundComponent } from '../components/not-found/not-found.component';


const routes: Routes = [
  { path: '', component: MainComponent },
  { path: 'main', redirectTo : '' },
  { path: 'home', redirectTo: ''},
  { path: 'login', component: LoginComponent},
  { path: 'register', component : RegisterComponent},
  { path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
