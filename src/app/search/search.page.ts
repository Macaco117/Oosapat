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

  List: any = [];
  FilterID: string = "";
  a: any = [];

  ngOnInit() {
    this.database.getR().subscribe(data =>{
      this.a = data;
    })
  }

  filter(){
    var FilterID = this.FilterID

    this.List = this.a.filter(function (el: any){
      if(FilterID == el.ID_REPORTE){
        return el.ID_REPORTE.toString().toLowerCase().includes(
          FilterID.toString().trim().toLowerCase()
        )
      }
    })
  }
}
