import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class GeocodingService {
  httpClient: HttpClient;
  authService: AuthService;

  constructor(httpClient: HttpClient, authService: AuthService) {
    this.httpClient=httpClient;
    this.authService= authService;
   }
  
   getMarkersFromBounds(boundingBox: any):Observable<any[]> {
    let body:string = "{ \"data\" : "+ JSON.stringify(boundingBox)+ "}";
    console.log(body);
    let baseUrl : string = 'http://localhost:8000/api/getMarkersFromBounds.php';
    let headers: HttpHeaders = new HttpHeaders().append('Authorization','Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJEb0dvb2QiLCJhdWQiOiJET0dPT0QtQVVESUVOQ0UiLCJpYXQiOjE1ODk2NjY0OTQsIm5iZiI6MTU4OTY2NjQ5OSwiZXhwIjoxNjIxMjAyNDk0LCJkYXRhIjp7ImlkIjpudWxsLCJlbWFpbCI6ImFlbS5iZW5tb2hhbWVkQHJvZHN0RDIub20ifX0.yfBq2UUva-arfqsGKeZkPx-kQRmPJE-s4BRZG7H7pAQ').append('Content-Type','application/json; charset=utf-8');	
    return this.httpClient.post<any[]>(baseUrl,body,{
      headers: headers,
    });
   }
}
