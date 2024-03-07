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

  }

  search(){
    this.database.getR().subscribe(data =>{
      this.List = data;
      this.a = this.filter();
    })
    console.log(this.a);
  }

  filter(){
    var FilterID = this.FilterID

    this.List = this.a.filter(function (el: any){
      return el.ID_REPORTE.toString().toLowerCase().includes(
        FilterID.toString().trim().toLowerCase()
      )
    })
  }
}
