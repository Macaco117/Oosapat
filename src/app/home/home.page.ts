import { Component, Input } from '@angular/core';
import { PhotosService } from '../services/photos.service';
import { DatabaseService } from '../services/database.service';
import { AlertController, IonSelect } from '@ionic/angular';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  //@Input() bd: any;
  ID_REPORTE!: string;
  ID_SOLUCION!: string;
  OBSERVACION!: string;

  PhotoFileName!: string;
  PhotoFilePath!: string;

  List: any = [];
  SelectorID: string = "";
  a: any = [];

  constructor(
    public photoService: PhotosService,
    private database: DatabaseService,
    private alertController: AlertController,
  ) {}

  async ngOnInit(){
    await this.photoService.loadSaved()
  }

  addPhoto(){
    this.photoService.Photo()
  }

  selector(){
    var SelectorID = this.SelectorID
    var val = {
      Observacion: this.OBSERVACION,
      Solucion: this.ID_SOLUCION
    }

    this.List = this.a.filter((el:any) =>{
      this.database.update
      if(SelectorID == el.ID_REPORTE){
        this.database.update(val).subscribe
      }
      return console.log(el.ID_REPORTE, " = ", SelectorID)
    })
  }

  /*
  upload(){
    var val = {
      Observacion: this.OBSERVACION,
      Solucion: this.ID_SOLUCION
    }
    this.database.update(val).subscribe(res =>{
      alert(res.toString())
    })
  }
  */
  
  uploadPhoto(event: any){
    //var file = event.target.files[0];
    const formData: FormData = new FormData()
    //formData.append('UploadedFile', file, file.name)

    this.database.uploadPhoto(formData).subscribe((data: any) => {
      this.photoService.photos = data.toString()
      this. PhotoFilePath = this.database.Photourl + this.photoService.photos
    })
    console.log(this.photoService.photos)
  }
  
  send(){
    this.selector()
    //this.uploadPhoto(event)
  }

  async alert(){
    const alert = await this.alertController.create({
      header: 'Espera un momento',
      message: '¿Estas seguro que deseas borrar las fotos?',
      buttons: [{
        text: 'No',
        role: 'Cancel',
        handler: () => {
          console.log(this.photoService.photos)
        }
      },{
        text: 'Si',
        role: 'Confirm',
        handler: () =>{
          this.clear()
        }
      }]
    })
    await alert.present()
  }

  clear(){
    localStorage.clear()
    window.location.reload()
  }

}
