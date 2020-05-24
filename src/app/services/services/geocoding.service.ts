import { Injectable } from "@angular/core";
import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { AuthService } from "./auth.service";
import {TodoMarker} from '../../model/todomarker';

@Injectable({
  providedIn: "root",
})
export class GeocodingService {
  httpClient: HttpClient;
  authService: AuthService;

  constructor(httpClient: HttpClient, authService: AuthService) {
    this.httpClient = httpClient;
    this.authService = authService;
  }

  getMarkersFromBounds(boundingBox: any): Observable<any[]> {
    let body: string = '{ "data" : ' + JSON.stringify(boundingBox) + "}";
    console.log(body);
    let baseUrl: string = "http://dogood.ddns.net/getMarkersFromBounds.php";
    let headers: HttpHeaders = new HttpHeaders()
      .append("Authorization", this.authService.getToken().toString())
      .append("Content-Type", "application/json; charset=utf-8");
    return this.httpClient.post<any[]>(baseUrl, body, {
      headers: headers,
    });
  }
  getMarkersFromCenter({lat,lon}, distance): Observable<TodoMarker[]> {
    let baseUrl: string = "http://dogood.ddns.net/getMarkersFromCenter.php";
    let headers: HttpHeaders = new HttpHeaders()
      .append("Authorization", this.authService.getToken().toString())
      .append("Content-Type", "application/json; charset=utf-8");
    return this.httpClient.post<any[]>(
      baseUrl,
      {
        "distance": distance,
        "center": {
          "lat": lat,
          "lon": lon,
        },
      },
      {
        headers: headers,
      }
    );
  }
}
