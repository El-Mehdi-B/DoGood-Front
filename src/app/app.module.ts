import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './modules/app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ComponentsModule } from './modules/components.module';
import { AngularMaterialModule } from './modules/angular-material.module';
import { AuthGuard } from './services/guards/auth.guard';
import { NoSpaceDirective } from './directive/no-space.directive';
@NgModule({
  declarations: [
    AppComponent,
    NoSpaceDirective,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ComponentsModule,
    AngularMaterialModule
  ],
  exports:[],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
