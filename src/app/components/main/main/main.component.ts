import { Component, OnInit, AfterViewInit } from '@angular/core';
import * as L from '../../../../../node_modules/leaflet';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements AfterViewInit {
  map;
  center;
  centerPerimeter;
  radius;
  httpClient:HttpClient;
  storage;
  public address:string ="";
  addressRequestTimeout;
  markersIsideBoundsTimeout;
  addressList:any[];


  constructor(httpClient:HttpClient){
    this.httpClient=httpClient;
  }

  centerIcon = new L.Icon({
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-icon.png',
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-icon-2x.png',
    iconSize:    [25, 41],
    iconAnchor:  [12, 41],
    popupAnchor: [1, -34],
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    shadowSize:  [41, 41]
  });


   tileLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{
    minZoom: 13,
    maxZoom: 18,
    attribution :'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  })

  ngAfterViewInit(): void {
    console.log('after view init');
    this.createMap();
  }


  createMap(){
    const anchorPoint = {
      lat : 45.745450,
      long :  4.841130
    }
    const zoomLevel = 12;
    this.map = L.map('map',{
      center: [anchorPoint.lat,anchorPoint.long],
      zoom : zoomLevel
    });
    this.tileLayer.addTo(this.map);

	this.map.on('dblclick',this.onMapClick.bind(this));
	this.map.on('zoomend',this.getTodosMarkersFromBounds.bind(this));
	this.map.on('moveend',this.getTodosMarkersFromBounds.bind(this));

  }

  onMapClick(e){
    this.updateCenter({
      lat:e.latlng.lat,
      long: e.latlng.lng,
    });
  
    this.focusOnCenter();
    this.map.doubleClickZoom.disable(); 
  }

  getLatLongFromCardinalPoint(latleng){
	return {
		lat : latleng.lat,
		lng : latleng.lng
	}
  }

  getTodosMarkersFromBounds(e){
	let boundingbox = [this.getLatLongFromCardinalPoint(this.map.getBounds().getNorthWest()),this.getLatLongFromCardinalPoint(this.map.getBounds().getNorthEast()),this.getLatLongFromCardinalPoint(this.map.getBounds().getSouthEast()),this.getLatLongFromCardinalPoint(this.map.getBounds().getSouthWest())];
	let params: HttpParams= new HttpParams().set('boundingBox',JSON.stringify(boundingbox));
	let baseUrl : string = 'http://localhost:8080/api/geMarkersFromBounds.php';
	let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Access-Control-Allow-Origin','*');
		
	let options = {params: params, headers: headers}

	clearTimeout(this.markersIsideBoundsTimeout);
		this.markersIsideBoundsTimeout =setTimeout(()=>{
		
		this.httpClient.get<any[]>(baseUrl, options).subscribe((response) => {
			
			//TODO
		},
		(error) => {
		console.log('Erreur ! : ' + error);
		});
		},1000);
}
  getFilteredTodoMarkers(e){

  }

  updateCenter(coordinates){
    if(this.center!=null){
      this.map.removeLayer(this.center);
	}
	this.radius=0;
    this.center = L.marker([coordinates.lat,coordinates.long], {icon: this.centerIcon});
    this.center.addTo(this.map);
	this.updateCenterPerimeter(this.radius);
	this.focusOnCenter();
	this.map.doubleClickZoom.disable();
	this.addressList=null;
	this.address="";
  }

  focusOnCenter(){
    this.map.panTo(this.center.getLatLng());
  }

  updateCenterPerimeter(radius:number){
    this.radius=radius;
    if(this.centerPerimeter!=null){
      this.map.removeLayer(this.centerPerimeter)
    }
    if(radius>0){
      this.centerPerimeter= L.circle([this.center.getLatLng().lat, this.center.getLatLng().lng], {
        color: 'green',
        fillColor: 'green',
        fillOpacity: 0.2,
        weight:2,
        radius: this.radius
    });
    this.centerPerimeter.addTo(this.map);
    }
  }


  getGpsCoordinateFromAdress(targetAddress: string){
	console.log('reached the set point');
    let isFound=false;
    if(this.addressList != null){
      for(let address of this.addressList){
        if (address['display_name']==targetAddress){
          let latitude: number = address['lat'];
          let longitude: number = address['lon'];
          this.updateCenter({
            lat:latitude,
            long:longitude
          })

          isFound=true;
        }
      }
    }
    if(!isFound){
		clearTimeout(this.addressRequestTimeout);
		this.addressRequestTimeout =setTimeout(()=>{
		let baseUrl : string = 'https://nominatim.openstreetmap.org/search?format=json&q='+targetAddress;
		console.log(baseUrl);
		this.httpClient.get<any[]>(baseUrl).subscribe((response) => {
		this.addressList=response;
		},
		(error) => {
		console.log('Erreur ! : ' + error);
		});
		},1000);
    }
    

    
  }



}


