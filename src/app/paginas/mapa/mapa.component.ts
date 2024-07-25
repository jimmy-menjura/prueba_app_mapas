import { Component, inject, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { Subscription } from 'rxjs';
import { DataService } from '../../servicios/data.service';
import io from 'socket.io-client';


@Component({
  selector: 'app-mapa',
  standalone: true,
  imports: [],
  templateUrl: './mapa.component.html',
  styleUrl: './mapa.component.css'
})
export class MapaComponent implements OnInit {
  socket = io("http://localhost:4000", {});
  _dataService = inject(DataService);
  map:any;
  mapIcon = L.icon({
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-icon.png',
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-icon-2x.png',
    iconSize:    [25, 41],
    iconAnchor:  [12, 41],
    popupAnchor: [1, -34],
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    shadowSize:  [41, 41]
    
  })
  constructor() {
   }

  ngOnInit(): void {
    this.verMapa();
    this.socket.on('nuevasDirecciones', (direcciones) => {
      console.log(direcciones);
      const marker = L.marker( [direcciones.origen,direcciones.destino ],{icon:this.mapIcon});
      marker.addTo(this.map).bindPopup("Cliente Ingresó").openPopup();
      alert("Cliente ingresó a los servicios");
    }); 
  }
  verMapa(){
    const latYlon = {
      // origen:4.6265976722086382,
      // destino:-74.15139124716826,
      origen:4.604105,
      destino:-74.169639,
    };
    this.map = L.map('map', {
      center: [ latYlon.origen,latYlon.destino ],
      zoom: 13
    });
  //  const mapa = L.tileLayer('	https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png',{
    const mapa = L.tileLayer('https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}.png',{
      minZoom:12,
      maxZoom:17,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });
    mapa.addTo(this.map);
    const descripcion = 'Cliente';


    const popUpoptions = {
      coords:latYlon,
      text:descripcion,
      open:true,
    };
    this.agregarMarcador(popUpoptions.coords,popUpoptions.text,popUpoptions.open);
    this._dataService.enviarData$.subscribe({
      next:(data:any)=>{
        if(data.length != 0){
          this.socket.emit('direcciones', data);
          const marker = L.marker( [data.origen,data.destino ],{icon:this.mapIcon});
          marker.addTo(this.map).bindPopup("Estas acá").openPopup();
        }
      },error:error=>{console.log("error al obtener los datos")}
    })
  }

  agregarMarcador(coords:any,text:string,open:boolean){
    const marker = L.marker( [coords.origen,coords.destino ],{icon:this.mapIcon});
    
    if(open){
     marker.addTo(this.map).bindPopup(text).openPopup();
    }
    else
    {
      marker.addTo(this.map).bindPopup(text);
    }
  }
}
