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

  constructor(
    public photoService: PhotosService,
    private database: DatabaseService,
    private alertController: AlertController,
  ) {}

  List: any = [];

  SelectorID: string = "";
    
  async ngOnInit(){
    await this.photoService.loadSaved()
  }

  addPhoto(){
    this.photoService.Photo()
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
  

  upload(){
    var val = {
      Observacion: this.OBSERVACION,
      Solucion: this.ID_SOLUCION
    }
    this.database.update(val).subscribe(res =>{
      alert(res.toString())
    })
    console.log("Observacion es = ", this.OBSERVACION)
    console.log("Solucion es = ", this.ID_SOLUCION)
  }

  send(){
    this.upload()
    this.uploadPhoto(event)
  }

  selector(){
    var SelectorID = this.SelectorID

    this.List.filter(function (el: any){
      return el.ID_REPORTE.toString().toLowerCase().includes(
        SelectorID.toString().trim().toLowerCase()
      )
    })
    console.log('Id reporte es = ', SelectorID)
  }

  async alert(){
    const alert = await this.alertController.create({
      header: 'Espera un momento',
      message: '¿Estas seguro que deseas borrar las fotos?',
      buttons: [{
        text: 'No',
        role: 'Cancel',
        handler: () => {
          console.log("no")
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
