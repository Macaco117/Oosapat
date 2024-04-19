import { Component } from '@angular/core';
import { PhotosService } from '../services/photos.service';
import { DatabaseService } from '../services/database.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  //Variables Reporte
  ID_REPORTE!: string;
  ID_SOLUCION: string = "valeu";
  OBSERVACION!: string;

  //Variables Ver
  SHOW = false;
  HIDE = true;

  constructor(
    public photoService: PhotosService,
    private database: DatabaseService,
    private alertController: AlertController,
  ) {}
 
  //Activa formulario
  show(){
    if(this.ID_REPORTE != null){
      this.photoService.loadSaved()
      this.SHOW=true
      this.HIDE=false
    }
    else{
      this.SHOW=false
      this.HIDE=true
    }
  }

  //Toma la foto
  addPhoto(){
    this.photoService.Photo()
  }
  
  //Actualiza reporte
  upload(){
    var database = this.database;

    var val = {
      ID_REPORTE: this.ID_REPORTE,
      ID_SOLUCION: this.ID_SOLUCION,
      OBSERVACION: this.OBSERVACION
    }

    database.update(val).subscribe(res => {
      alert(res.toString())
    })
  }
  
  //Sube foto
  uploadPhoto(event: any){
    var file = event.target.files[0]
    const formData: FormData = new FormData();
    formData.append("si", file, file.Name);
    this.database.uploadPhoto(formData).subscribe((data: any) => {

    })
    console.log("Se subio el archivo:", file)
    console.log(formData)
  }

  //Sube la informacion a la base de datos
  send(){
    //this.upload()
    //this.uploadPhoto(event)
  }

  //Alerte borrar
  async alert(){
    const alert = await this.alertController.create({
      header: 'Espera un momento',
      message: '¿Estas seguro que deseas borrar las fotos?',
      buttons: [{
        text: 'No',
        role: 'Cancel',
        handler: () => {
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
  
  //Borrar y recargar
  clear(){
    localStorage.clear()
    window.location.reload()
  }

}