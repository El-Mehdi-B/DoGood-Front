import { LoginComponent } from '../components/login/login/login.component';
import { RegisterComponent } from '../components/login/register/register.component';
import { MainComponent } from '../components/main/main/main.component'
import { ToolbarComponent } from '../components/toolbar/toolbar.component';
import { NotFoundComponent } from '../components/not-found/not-found.component';
import { NgModule } from '@angular/core';



@NgModule({
    declarations: [    
        LoginComponent,
        RegisterComponent,
        MainComponent,
        ToolbarComponent,        
        NotFoundComponent],
    imports: [],
    exports: []
  })
  export class ComponentsModule { }
  