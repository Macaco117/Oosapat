import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../services/database.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {

  constructor(
    private database: DatabaseService,
  ) {}

  //Variables Datos
  List: any = [];
  db: any = [];
  
  //Variables Filtro
  FilterID: string = "";

  //Variables Visibles
  SHOW = false;
  HIDE = true;
  
  //Carga base de datos
  ngOnInit() {
    this.database.getR().subscribe(data =>{
      this.db = data;
    })
  }

  //Mostrar
  show(){
    if(this.FilterID != null){
      this.SHOW=true
      this.HIDE=false
    }
    else{
      this.SHOW=false
      this.HIDE=true
    }
  }

  //Filtro
  filter(){
    var FilterID = this.FilterID

    this.List = this.db.filter(function (el: any){
      if(FilterID == el.ID_REPORTE){
        return el.ID_REPORTE.toString().toLowerCase().includes(
          FilterID.toString().trim().toLowerCase()
        )
      }
    })
  }

  search(){
    this.show()
    this.filter()
  }
}
