import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }
  isLogged():boolean{
    console.log('AUTHENTIFICATION CALLED');
    return false;
  }
}
