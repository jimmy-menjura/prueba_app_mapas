import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Direccion } from '../modelos/direcciones';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  url:String = "http://localhost:3000/";
  enviarData = new BehaviorSubject<any[]>([]);
  enviarData$ = this.enviarData.asObservable();

  constructor(public http:HttpClient) { }

  obtenerDirecciones():Observable<Direccion>{
    return this.http.get<Direccion>(`${this.url}direccion`);
  }
  enviarDirecciones(form:Direccion):Observable<Direccion>{
    return this.http.post<Direccion>(`${this.url}direccion`,form)
  }
  enviandoDatosDireccion(direcciones:any){
    this.enviarData.next(direcciones);
  }

}
