import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GeocodingService {
  httpClient: HttpClient;
  
  constructor(httpClient:HttpClient){
    this.httpClient=httpClient;
  }


  getGpsCoordinatesFromAddress(adress:String): Observable<any[]>{
    let baseUrl : string = 'https://nominatim.openstreetmap.org/search?format=json&limit=1&q='+adress;
    console.log(baseUrl);
    return this.httpClient.get<any[]>(baseUrl);
  }
  


}
