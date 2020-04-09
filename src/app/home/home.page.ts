import { Component,NgZone } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage {

  clickedImage: string;
  latitude: any = 0; //latitude
  longitude: any = 0; //longitude

  cam_options: CameraOptions = {
    quality: 30,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE,
  }
  options = {
    timeout: 10000, 
    enableHighAccuracy: true, 
    maximumAge: 3600
  };
  constructor(private camera: Camera, private geolocation: Geolocation,private httpClient:HttpClient) { }



  getCurrentCoordinates() {
    this.geolocation.getCurrentPosition().then((resp) => {
      this.latitude = resp.coords.latitude;
      this.longitude = resp.coords.longitude;
     }).catch((error) => {
       console.log('Error getting location', error);
     });
  }

  captureImage() {
    this.getCurrentCoordinates()
    this.camera.getPicture(this.cam_options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      let base64Image = 'data:image/jpeg;base64,' + imageData;
      this.clickedImage = base64Image;
      console.log(this.clickedImage)

    }, (err) => {
      console.log(err);
      // Handle error
    });
  }

upload(){
  let data=[this.clickedImage,this.longitude,this.latitude]
  console.log(data)
  this.httpClient.post('http://127.0.0.1:5000/ ', data)
      .subscribe(res => {
        console.log(res);
        alert('SUCCESS !!');
      })
}
}