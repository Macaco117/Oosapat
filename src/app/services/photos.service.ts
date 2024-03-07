import { Injectable } from '@angular/core';
import { Camera, CameraResultType, CameraSource, Photo} from '@capacitor/camera'
import { Filesystem, Directory} from '@capacitor/filesystem'
import { Preferences } from '@capacitor/preferences';

@Injectable({
  providedIn: 'root'
})
export class PhotosService {

  public photos: Phot0[] = [];
  private PHOTO_STORAGE: string = 'photos';

  constructor() { }

  public async Photo(){
    const pC = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
      quality: 100,
    })

    const savedImageFile = await this.savePicture(pC)
    this.photos.unshift(savedImageFile)

    Preferences.set({
      key: this.PHOTO_STORAGE,
      value: JSON.stringify(this.photos)
    })
  }

  public async savePicture(photo: Photo){
    const B64 = await this.readB64(photo)
    const fileName = Date.now() + '.jpeg'
    const savedFile = await Filesystem.writeFile({
      path: fileName,
      data: B64,
      directory: Directory.Data
    })

    return{
      filepath: fileName,
      webviewPath: photo.webPath
    }
  }

  private async readB64(photo : Photo){
    const response = await fetch(photo.webPath!)
    const blob = await response.blob()

    return await this.convertBlobToB64(blob) as string
  }

  private convertBlobToB64 = (blob: Blob) => new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onerror = reject
    reader.onload = () => {
      resolve(reader.result)
    }
    reader.readAsDataURL(blob)
  })

  public async loadSaved(){
    const {value} = await Preferences.get({ key: this.PHOTO_STORAGE})
    this.photos = (value ? JSON.parse(value):[]) as Phot0[];

    for(let photo of this.photos){
      const readFile = await Filesystem.readFile({
        path: photo.filepath,
        directory: Directory.Data
      })

      photo.webviewPath = `data:image/jpeg;base64,${readFile.data}`
    }
  }
}

export interface Phot0{
  filepath: string;
  webviewPath?: string;
}