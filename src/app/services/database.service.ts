import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  //Redirecciones
  readonly APIurl= "http://localhost:49885/api";
  readonly Photourl= "http://localhost:49885/Photos";

  constructor(private http:HttpClient) { }

  //Obtiene Respuestas_Reportes
  get():Observable<any[]>{
    return this.http.get<any>(this.APIurl + "/TB_RESPUESTAS_REPORTES")
  }
  
  //Actualiza Respuestas_Reportes
  update(val:any){
    return this.http.put(this.APIurl + "/TB_RESPUESTAS_REPORTES", val)
  }

  //Obtiene Reportes_Atencion
  getR():Observable<any[]>{
    return this.http.get<any>(this.APIurl + "/TB_REPORTES_ATENCION")
  }

  //Sube Fotos a la base
  uploadPhoto(val: any){
    return this.http.post(this.APIurl + "/TB_RESPUESTAS_REPORTES/SaveFile", val)
  }
}
