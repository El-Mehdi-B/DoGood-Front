import { Injectable } from "@angular/core";
import { HttpClient, HttpResponseBase } from "@angular/common/http";
import { Router } from "@angular/router";
import { stringify } from "querystring";
import { error } from "protractor";
import { Observable } from "rxjs";
const jwtIdentifier: string = "Authorization";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  httpClient: HttpClient;
  router: Router;
  toolbar;
  constructor(httpClient: HttpClient, router: Router) {
    this.httpClient = httpClient;
    this.router = router;
  }
  isLogged(): boolean {
    return this.getToken()!=null;
  }
  disconnect() {
    localStorage.removeItem(jwtIdentifier);
    this.router.navigate(["/login"]);
    this.toolbar.animate();

  }
  connect(username: string, password: string): Observable<any[]> {
    return this.httpClient.post<any[]>("http://localhost:8000/api/login.php",JSON.stringify({
      username: username,
      password: password,
    }));
  }
  storeToken(jwt: string) {
    localStorage.setItem(jwtIdentifier, jwt);
    this.toolbar.animate(); 
    this.router.navigate(['/']);
  }
  getToken(): string {
    return localStorage.getItem(jwtIdentifier);
  }
  register(
    username: string,
    email: string,
    password: string
  ): Observable<any[]> {
    return this.httpClient.post<any[]>(
      "http://localhost:8000/api/register.php",
      JSON.stringify({ username: username, email: email, password: password })
    );
  }
  setToolbar(toolbar){
    this.toolbar=toolbar;
  }
}
