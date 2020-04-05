import { LoginComponent } from '../components/login/login/login.component';
import { RegisterComponent } from '../components/login/register/register.component';
import { MainComponent } from '../components/main/main/main.component'
import { ToolbarComponent } from '../components/toolbar/toolbar.component';
import { NotFoundComponent } from '../components/not-found/not-found.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularMaterialModule } from './angular-material.module';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
    declarations: [    
        LoginComponent,
        RegisterComponent,
        MainComponent,
        ToolbarComponent,        
        NotFoundComponent
    ],
    imports: [CommonModule,AngularMaterialModule,AppRoutingModule,ReactiveFormsModule],
    exports: [
        LoginComponent,
        RegisterComponent,
        MainComponent,
        ToolbarComponent,        
        NotFoundComponent]
  })
  export class ComponentsModule { }
  