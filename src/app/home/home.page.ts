import { Component, Input } from '@angular/core';
import { PhotosService } from '../services/photos.service';
import { DatabaseService } from '../services/database.service';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  ID_REPORTE!: string;
  ID_SOLUCION!: string;
  OBSERVACION!: string;

  PhotoFileName!: string;
  PhotoFilePath!: string;

  a: any = [];

  select={
    Domicilio :1,
    CC: 2,
  }
  
  constructor(
    public photoService: PhotosService,
    private database: DatabaseService,
    private alertController: AlertController,
  ) {}

  async ngOnInit(){
    await this.photoService.loadSaved()

    this.database.get().subscribe(data =>{
      this.a = data;
    })
  }

  addPhoto(){
    this.photoService.Photo()
  }
  
  upload(){
    var database = this.database;
    var val = {
      ID_REPORTE: this.ID_REPORTE,
      ID_SOLUCION: this.ID_SOLUCION,
      OBSERVACION: this.OBSERVACION
    }

    database.update(val).subscribe(res => {
      alert(res.toString())
      console.log(val)
    })
  }
  
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
    this.upload()
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
