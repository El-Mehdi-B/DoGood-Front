import { LoginComponent } from '../components/login/login/login.component';
import { RegisterComponent } from '../components/login/register/register.component';
import { RegisteredComponent} from '../components/login/registered/registered.component'
import { MainComponent } from '../components/main/main/main.component'
import { CreateComponent } from '../components/main/create/create.component'

import { ToolbarComponent } from '../components/toolbar/toolbar.component';
import { NotFoundComponent } from '../components/not-found/not-found.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularMaterialModule } from './angular-material.module';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import {FormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AboutComponent } from '../components/about/about.component';
import { DescribeComponent } from '../components/describe/describe.component';



@NgModule({
    declarations: [    
        LoginComponent,
        RegisterComponent,
        MainComponent,
        CreateComponent,
        ToolbarComponent,        
        NotFoundComponent,
        RegisterComponent,
        RegisteredComponent,
        AboutComponent,
        DescribeComponent
    ],
    imports: [CommonModule,AngularMaterialModule,AppRoutingModule,ReactiveFormsModule,FormsModule,HttpClientModule],
    exports: [
        LoginComponent,
        RegisterComponent,
        MainComponent,CreateComponent,
        ToolbarComponent,        
        NotFoundComponent,
        RegisterComponent,
        RegisteredComponent,
        AboutComponent,
        DescribeComponent]
        
  })
  export class ComponentsModule { }
  