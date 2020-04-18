import { Component, OnInit, AfterViewInit } from '@angular/core';
import * as L from '../../../../../node_modules/leaflet';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements AfterViewInit {
  map;
  center;
  centerPerimeter;

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
    minZoom: 12,
    maxZoom: 17,
    attribution :'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  })

  constructor() { }
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
    this.updateCenter({
      lat:anchorPoint.lat,
      long:anchorPoint.long
    })
    this.map.on('click',this.onMapClick.bind(this));

  }

  onMapClick(e){
    console.log('Click on map !');
    this.updateCenter({
      lat:e.latlng.lat,
      long: e.latlng.lng,
    });
    this.focusOnCenter();
  }

  updateCenter(coordinates){
    if(this.center!=null){
      this.map.removeLayer(this.center);
    }
    this.center = L.marker([coordinates.lat,coordinates.long], {icon: this.centerIcon});
    this.center.addTo(this.map);
    this.updateCenterPerimeter(0);
  }

  focusOnCenter(){
    this.map.panTo(this.center.getLatLng());
  }

  addMarker(coordinates){
    //todo

  }

  updateCenterPerimeter(radius:number){
    if(this.centerPerimeter!=null){
      this.map.removeLayer(this.centerPerimeter)
    }
    if(radius>0){
      this.centerPerimeter= L.circle([this.center.getLatLng().lat, this.center.getLatLng().lng], {
        color: 'green',
        fillColor: 'green',
        fillOpacity: 0.2,
        weight:2,
        radius: radius
    });
    this.centerPerimeter.addTo(this.map);
    }


  }


}



/*
text to adress API
bound to anchors points ?

var bounds = new L.LatLngBounds(arrayOfLatLngs);



recenter with select on adress,
select on map,
draw circle
display Menu,
Popup ?

*/