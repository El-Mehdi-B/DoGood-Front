import { Component, AfterViewInit } from "@angular/core";
import { TodoMarker } from "../../../model/todomarker";
import * as L from "../../../../../node_modules/leaflet";
import { HttpClient } from "@angular/common/http";
import { GeocodingService } from "src/app/services/services/geocoding.service";
import { Observable } from 'rxjs/internal/Observable';

@Component({
  selector: "app-main",
  templateUrl: "./main.component.html",
  styleUrls: ["./main.component.scss"],
})
export class MainComponent implements AfterViewInit {
  map;
  center;
  centerPerimeter;
  geocodingService;
  radius;
  httpClient: HttpClient;
  storage;
  public address: string = "";
  addressRequestTimeout;
  markersIsideBoundsTimeout;
  addressList: any[];
  markerList: Observable<TodoMarker[]>;
  mapMarkerList: any[]= [];
  firstCenterResearch: boolean = true;

  constructor(httpClient: HttpClient, geocodingService: GeocodingService) {
    this.geocodingService = geocodingService;
    this.httpClient = httpClient;
  }

  centerIcon = new L.Icon({
    iconUrl:
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-icon.png",
    iconRetinaUrl:
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-icon-2x.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowUrl:
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
    shadowSize: [41, 41],
  });

  tileLayer = L.tileLayer(
    "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    {
      minZoom: 13,
      maxZoom: 18,
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }
  );


  markerIcon = new L.Icon({
    iconUrl:
      "https://image.flaticon.com/icons/svg/2919/2919717.svg",
    iconRetinaUrl:
      "https://image.flaticon.com/icons/svg/2919/2919717.svg",
    iconSize: [28, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowUrl:
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
    shadowSize: [41, 41],
  });


  ngAfterViewInit(): void {
    console.log("after view init");
    this.createMap();
  }
  createMap() {
    const anchorPoint = {
      lat: 45.74545,
      long: 4.84113,
    };
    const zoomLevel = 12;
    this.map = L.map("map", {
      center: [anchorPoint.lat, anchorPoint.long],
      zoom: zoomLevel,
    });
    this.tileLayer.addTo(this.map);

    this.map.on("dblclick", this.onMapClick.bind(this));
    this.map.on("zoomend", this.getMarkers.bind(this));
    this.map.on("moveend", this.getMarkers.bind(this));
  }
  onMapClick(e) {
    this.updateCenter({
      lat: e.latlng.lat,
      long: e.latlng.lng,
    });

    this.focusOnCenter();
    this.map.doubleClickZoom.disable();
  }
  getLatLongFromCardinalPoint(latleng) {
    return {
      lat: latleng.lat,
      lon: latleng.lng,
    };
  }
  getMarkers(e) {
    if (this.radius == 0 || this.radius == null) {
      let boundingbox = [
        this.getLatLongFromCardinalPoint(this.map.getBounds().getNorthWest()),
        this.getLatLongFromCardinalPoint(this.map.getBounds().getNorthEast()),
        this.getLatLongFromCardinalPoint(this.map.getBounds().getSouthEast()),
        this.getLatLongFromCardinalPoint(this.map.getBounds().getSouthWest()),
      ];

      clearTimeout(this.markersIsideBoundsTimeout);
      this.markersIsideBoundsTimeout = setTimeout(() => {
        this.geocodingService.getMarkersFromBounds(boundingbox).subscribe(
          (response) => {
            this.markerList=response;
            this.markersToMapMarkers(response);
            console.log(JSON.stringify(response));
          },
          (error) => {
            console.log("Erreur ! : " + error);
          }
        );
      }, 1000);
    } else if (
      this.radius > 0 &&
      this.center != null &&
      this.firstCenterResearch
    ) {
      this.geocodingService
        .getMarkersFromCenter(
          {
            lat: this.center.getLatLng().lat,
            lon: this.center.getLatLng().lng,
          },
          this.radius
        )
        .subscribe(
          (response) => {
            console.log(JSON.stringify(response));
            this.markerList=response;
            this.markersToMapMarkers(response);
            this.firstCenterResearch = false;
          },
          (errror) => {
            this.firstCenterResearch = false;
          }
        );
      this.firstCenterResearch = false;
    }
  }
  updateCenter(coordinates) {
    this.firstCenterResearch = true;
    if (this.center != null) {
      this.map.removeLayer(this.center);
    }
    this.radius = 0;
    this.center = L.marker([coordinates.lat, coordinates.long], {
      icon: this.centerIcon,
    });
    this.center.addTo(this.map);
    this.updateCenterPerimeter(this.radius);
    this.focusOnCenter();
    this.map.doubleClickZoom.disable();
    this.addressList = null;
    this.address = "";
    this.setResearchLabel(this.center);
  }
  focusOnCenter() {
    this.map.panTo(this.center.getLatLng());
  }
  updateCenterPerimeter(radius: number) {
    this.firstCenterResearch = true;
    this.radius = radius;
    if (this.centerPerimeter != null) {
      this.map.removeLayer(this.centerPerimeter);
    }
    if (radius > 0) {
      this.centerPerimeter = L.circle(
        [this.center.getLatLng().lat, this.center.getLatLng().lng],
        {
          color: "green",
          fillColor: "green",
          fillOpacity: 0.2,
          weight: 2,
          radius: this.radius,
        }
      );
      this.centerPerimeter.addTo(this.map);
      this.getMarkers(null);
      console.log("updated radius, should re-render");
    }
  }
  getGpsCoordinateFromAdress(targetAddress: string) {
    let isFound = false;
    if (this.addressList != null) {
      for (let address of this.addressList) {
        if (address["display_name"] == targetAddress) {
          let latitude: number = address["lat"];
          let longitude: number = address["lon"];
          this.updateCenter({
            lat: latitude,
            long: longitude,
          });
          isFound = true;
        }
      }
    }
    if (!isFound) {
      clearTimeout(this.addressRequestTimeout);
      this.addressRequestTimeout = setTimeout(() => {
        let baseUrl: string =
          "https://nominatim.openstreetmap.org/search?format=json&q=" +
          targetAddress;
        console.log(baseUrl);
        this.httpClient.get<any[]>(baseUrl).subscribe(
          (response) => {
            this.addressList = response;
          },
          (error) => {
            console.log("Erreur ! : " + error);
          }
        );
      }, 1000);
    }
  }
  setResearchLabel(center) {
    let params: string =
      "format=json" +
      "&" +
      "lat=" +
      center.getLatLng().lat +
      "&" +
      "lon=" +
      center.getLatLng().lng;

    this.httpClient
      .get<any[]>("https://nominatim.openstreetmap.org/reverse?" + params)
      .subscribe((response) => {
        console.log(JSON.stringify(response));
        this.address = response["display_name"];
      });
  }

  routeTo(marker){

  }

  markersToMapMarkers(markerList){
    if(this.mapMarkerList.length>0)this.deleteMapMarkers();
    for(let marker of markerList){
      this.mapMarkerList.push(
        L.marker([marker.latitude, marker.longitude], { icon: this.markerIcon})
        );
    }
    this.drawMapMarkers();
  }


  deleteMapMarkers(){
    console.log('deleted one !');
    for(let mapMarker of this.mapMarkerList){
      console.log('deleted one !');
      this.map.removeLayer(mapMarker);
    }
    this.mapMarkerList=[];
  }
  drawMapMarkers(){
    for(let mapMarker of this.mapMarkerList){
      mapMarker.addTo(this.map);
    }
  }
}
