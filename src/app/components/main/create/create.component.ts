import { Component, AfterViewInit, ViewChild } from "@angular/core";
import * as L from "../../../../../node_modules/leaflet";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { GeocodingService } from "src/app/services/services/geocoding.service";
import { AuthService } from 'src/app/services/services/auth.service';

@Component({
  selector: "app-create",
  templateUrl: "./create.component.html",
  styleUrls: ["./create.component.scss"],
})
export class CreateComponent implements AfterViewInit {
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
  firstCenterResearch: boolean = true;
  authService: AuthService;

  srcResult;

  @ViewChild('fileInput')
  fileInput;

  file: File | null = null;


  constructor(httpClient: HttpClient, geocodingService: GeocodingService, authService: AuthService) {
    this.geocodingService = geocodingService;
    this.httpClient = httpClient;
    this.authService = authService;
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
    this.createMap();
  }

  createMap() {
    const anchorPoint = {
      lat: 45.74545,
      long: 4.84113,
    };
    const zoomLevel = 12;
    this.map = L.map("map2", {
      center: [anchorPoint.lat, anchorPoint.long],
      zoom: zoomLevel,
    });
    this.tileLayer.addTo(this.map);

    this.map.on("dblclick", this.onMapClick.bind(this));
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
    this.focusOnCenter();
    this.map.doubleClickZoom.disable();
    this.addressList = null;
    this.address = "";
    this.setResearchLabel(this.center);
  }
  
  focusOnCenter() {
    this.map.panTo(this.center.getLatLng());
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
        this.httpClient.get<any[]>(baseUrl).subscribe(
          (response) => {
            this.addressList = response;
          },
          (error) => {
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
      this.address = response["display_name"];
      });
  }

  onFileSelected() {
    const files: { [key: string]: File } = this.fileInput.nativeElement.files;
    this.file = files[0];
    console.log(this.file);
  }
  postImage(){

    let formData: FormData = new FormData();
    formData.set('image',this.file);
    formData.append('imageType',"image");

    let httpHeaders: HttpHeaders= new HttpHeaders().
    append("Authorization", this.authService.getToken().toString());
    this.httpClient.post<any[]>("http://localhost:8000/api/upload_photo.php",formData,{
      headers:httpHeaders
    }).subscribe(
      uploadResponse =>{
        console.log("eheh buoy");
      }
    )
  }
}
