import { Component, Input } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, Platform, LoadingController, Loading } from 'ionic-angular';
import { FormBuilder, FormGroup, FormArray, Validators } from
  '@angular/forms';
import { APIService } from '../../providers/api-service';
import { LoginService } from '../../providers/login-service';
//import { Camera } from "@ionic-native/camera";
//import { FileEntry, File } from "@ionic-native/file";
//import { LoadingController, Loading, ToastController } from "ionic-angular";
// import "rxjs/add/operator/map";
// import "rxjs/add/operator/catch";
// import 'rxjs/add/observable/throw';
import { ImagePicker } from '@ionic-native/image-picker';
import { sEndPoint } from '../../app/env.properties';
//import { sIMAGE_URL } from '../../app/properties';
//import { AddedInfoPage } from '../added-info/added-info';

import { File } from '@ionic-native/file';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { FilePath } from '@ionic-native/file-path';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Diagnostic } from '@ionic-native/diagnostic';
import { V } from '../../app/properties';
import { PriceValidator } from './PriceValidator';
//import { AndroidPermissions } from '@ionic-native/android-permissions';


declare var cordova: any;

//https://github.com/dtaalbers/ionic-2-examples/blob/master/file-transfer-upload/app/services/plugins.service.ts

@IonicPage()
@Component({
  selector: 'page-add-menu',
  templateUrl: 'add-menu.html'
})
export class AddMenuPage {
  oInputForm: FormGroup;
  bSignUp = false;
  PRODUCT_ID: number = 0;
  @Input() oDiscounts: any[]
    = [{ RATE: 0, ADVANCEDAYS: 0 }];
  oItem: any = { TITLE: '', DESCRIPTION: '', USUAL_PRICE: '', ISACTIVE: 'N' };
  bLoaded: boolean = false;
  oTitle: string = "Add menu";

  bNoImage: boolean = true;

  lastImage: string = null;
  loading: Loading;
  //  oDiscountInfo: FormArray ;
  //http://stackoverflow.com/questions/38007236/how-to-dynamically-add-and-remove-form-fields-in-angular-2

  constructor(public navCtrl: NavController, public navParams: NavParams, public oBuilder: FormBuilder,
    //private androidPermissions: AndroidPermissions,
    private oDiagnostic: Diagnostic,
    private readonly loadingCtrl: LoadingController,
    private readonly oAPIService: APIService,
    private readonly oLoginService: LoginService,
    public oImagePicker: ImagePicker,
    public toastCtrl: ToastController, public platform: Platform,
    private camera: Camera, private transfer: FileTransfer, private file: File, private filePath: FilePath) {
    this.bLoaded = false;
    this.PRODUCT_ID = navParams.get('PRODUCT_ID');
    this.oInputForm = this.oBuilder.group({});
    if (this.PRODUCT_ID !== undefined) {
      this.loadProduct();
      this.oTitle = "Edit menu";
    }
    else
      this.populateFormData();
  }

  getBgColor(fg: FormGroup, s: string) {
    var oR = fg.controls['RATE'].value;
    var oA = fg.controls['ADVANCEDAYS'].value;
    if ((+oR != 0 && +oA != 0) || (+oR + +oA) == 0)
      return 'ksd-valid';
    if (s == 'RATE' && +oR == 0)
      return 'ksd-invalid';
    if (s == 'ADVANCEDAYS' && +oA == 0)
      return 'ksd-invalid';
    return 'ksd-valid';
  }

//  http://plnkr.co/edit/XTeH1ifQTJSoMvBEvE0d?p=preview
  validDiscountDays = (fg: FormGroup) => {
    //    console.log(fg.controls['RATE'].value);
    //    console.log(fg.controls['ADVANCEDAYS'].value);
    // fg.controls['RATE'].validator = null;
    // fg.controls['ADVANCEDAYS'].validator = null;
    var oR = fg.controls['RATE'].value;
    var oA = fg.controls['ADVANCEDAYS'].value;
    console.log("Validing [" + oR + "] [" + oA + "]");
    let errors = fg.controls['RATE'].errors ? fg.controls['RATE'].errors : {};
    errors['discountDays'] = false;
    errors['required'] = false;
    if (+oR == 0 && +oA > 0) {
      errors['discountDays'] = true;
      errors['required'] = true;
    }
    fg.controls['RATE'].setErrors(errors, { emitEvent: errors['discountDays'] });

    errors = fg.controls['ADVANCEDAYS'].errors ? fg.controls['ADVANCEDAYS'].errors : {};
    errors['discountDays'] = false;
    errors['required'] = false;
    if (+oR > 0 && +oA == 0) {
      errors['discountDays'] = true;
      errors['required'] = true;
    }
    //    errors['discountDays'] = true;
    fg.controls['ADVANCEDAYS'].setErrors(errors, { emitEvent: errors['discountDays'] });
    //      return { 'discountDays': false } ;
    if (+oR != 0 && +oA != 0) {
      console.log("Valid [" + oR + "] [" + oA + "]");
      return { 'discountDays': false };
      //      fg.controls['RATE'].setErrors(errors, { emitEvent: true });
      //      return { 'discountDays': false };
      //      return ({ validDiscountDays: { valid: true } });

    }
    if ((+oR + +oA) == 0) {
      console.log("Valid [" + oR + "] [" + oA + "]");
      return { 'discountDays': false };
      //      fg.controls['ADVANCEDAYS'].setErrors(errors, { emitEvent: true });
      //      return ;
      //      return ({ validDiscountDays: { valid: true } });
    }
    else {
      fg.controls['RATE'].updateValueAndValidity({ onlySelf: true, emitEvent: true });
      fg.controls['ADVANCEDAYS'].updateValueAndValidity({ onlySelf: true, emitEvent: true });
    }
    return null;

    // if ( +oA != 0 )
    // {
    //   errors['validDiscountDays'] = false;
    //   fg.controls['RATE'].setErrors(errors, { emitEvent: true });
    //   return ;
    // }
    // if ( +oR != 0 )
    // {
    //   errors['validDiscountDays'] = false;
    //   fg.controls['ADVANCEDAYS'].setErrors(errors, { emitEvent: true });
    //   return ;
    // }
    // let errors = fg.controls['RATE'].errors ? fg.controls['ADVANCEDAYS'].errors : {};
    // errors['validDiscountDays'] = false;
    // fg.controls['RATE'].setErrors(errors, { emitEvent: true });
    // https://stackoverflow.com/questions/41043745/angular-2-cross-field-validation-model-based-adderrors
    // formGroup.controls['cityTwo'].setErrors(errors, { emitEvent: true });

    // errors = formGroup.controls['cityTwo'].errors ? formGroup.controls['cityTwo'].errors : {};
    //   errors['equalCities'] = false;

    //   formGroup.controls['cityTwo'].setErrors(errors, { emitEvent: true });

    //   return { 'equalCities': false };
    // <...>
    //     {
    //       // fg.controls['RATE'].setValidators(Validators.compose([]));
    //       // fg.controls['ADVANCEDAYS'].setValidators(Validators.compose([]));
    // //      fg.updateValueAndValidity();
    //       return ({ validDiscountDays: { valid: true } });
    //     }
    // if (oR > 0 && oA > 0) {
    //   return (null);
    // }
    // if (oR == 0 && oA == 0) {
    //   return (null);
    // }
    //    if ( oR > 0 )
    // fg.controls['RATE'].validator = Validators.required;
    // fg.controls['ADVANCEDAYS'].validator = Validators.required;
    //    fg.controls['RATE'].validator = Validators.required ;
    //    console.log("Error: " + oR + " " + oA);
    //    fg.controls['RATE'].setErrors("Required") ;
    // if (+oR == 0)
    //   fg.controls['RATE'].setValidators(Validators.compose([Validators.required]));
    // if (+oA == 0)
    //   fg.controls['ADVANCEDAYS'].setValidators(Validators.compose([Validators.required]));
    //   fg.updateValueAndValidity();
    //    return ({ validDiscountDays: { valid: false } });
  }

  populateFormData() {
    this.oInputForm = this.oBuilder.group({
      TITLE: [this.oItem.TITLE, Validators.compose([Validators.maxLength(V.MenuTitle_Max), Validators.minLength(V.MenuTitle_Min), Validators.required])],
      DESCRIPTION: [this.oItem.DESCRIPTION, Validators.compose([Validators.maxLength(V.MenuDescription_Max), Validators.minLength(V.MenuDescription_Min), Validators.required])],
      USUAL_PRICE: [this.oItem.USUAL_PRICE, Validators.compose([PriceValidator.validPrice, Validators.required])],
      ISACTIVE: [this.oItem.ISACTIVE == 'Y'],
      discounts: this.oBuilder.array([]),
    });
    const arrayControl = <FormArray>this.oInputForm.controls['discounts'];
    this.oDiscounts.forEach(o => {
      let oD = this.oBuilder.group({
        RATE: [o.RATE],
        ADVANCEDAYS: [o.ADVANCEDAYS]
      } ) ;
      //, this.validDiscountDays
      // {
      //     validator: (fg: FormGroup) => {
      //       return this.validDiscountDays(fg);
      //     }
//        }
    //   );
      arrayControl.push(oD);
    });

    for (let i = this.oDiscounts.length; i < 4; i++)
      this.addInput();
    this.bLoaded = true;

    // Subscribe to value changes on FormGroup
    //     this.oInputForm.valueChanges.subscribe(c => {
    // Check empty values
    //       const a = <FormArray>this.oInputForm.controls['discounts'] ;
    //     arrayControl.valueChanges.subscribe(cc => {
    //       console.log(JSON.stringify(cc));
    //       cc.forEach(element => {
    // //        arrayControl[cc].validator = null;
    //         console.log(element.RATE + "," + element.ADVANCEDAYS);
    //         if (+element.RATE > 0 && +element.ADVANCEDAYS == 0)
    //   ;//        arrayControl[cc].validator = Validators.required;
    //         if (+element.ADVANCEDAYS > 0 && +element.RATE == 0)
    //    ;//       arrayControl[cc].validator = Validators.required;
    //      //   console.log(arrayControl[cc].validator + " " + JSON.stringify(element));
    //       });
    //        https://stackoverflow.com/questions/477 5339/dynamic-form-array-validation-angular-2
    //    });
    //   if (this._fb.controls['Id'].value !== '' && this._fb.controls['orgName'].value !== '') {
    //       // Set validators
    //       this._fb.controls['billing'].validator = Validators.required; // You can specify any validator method here
    //       this._fb.controls['payment'].validator = Validators.required;
    //   } else {
    //       this._fb.controls['billing'].validator = null;
    //       this._fb.controls['payment'].validator = null;
    //   }
    //   });
  }
  loadProduct() {
    this.oAPIService.send2ServerP("product/" + this.PRODUCT_ID).then((data) => {
      this.oItem = data.result[0];
      console.log(JSON.stringify(this.oItem));
      this.oAPIService.send2ServerP("product/" + this.PRODUCT_ID + "/discounts").then((d) => {
        this.oDiscounts = d.result;
        this.bNoImage = false;
        this.populateFormData();
      });
    });
  }
  addInput(): void {
    const arrayControl = <FormArray>this.oInputForm.controls['discounts'];
    let oD = this.oBuilder.group({
      RATE: [0],
      ADVANCEDAYS: [0]
    }, {
        validator: (fg: FormGroup) => {
          return this.validDiscountDays(fg);
        }
      });
    arrayControl.push(oD);
  }
  delInput(index: number): void {
    const arrayControl = <FormArray>this.oInputForm.controls['discounts'];
    arrayControl.removeAt(index);
  }
  openAlbum(): Promise<any> {
    return this.oImagePicker.getPictures({
      quality: 100,
      maximumImagesCount: 15,
    });
  }
  onImageList() {
    this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
    //    this.takePicture(this.camera.PictureSourceType.CAMERA);
    /*
        this.openAlbum().then((imgUrls) => {
          console.log(JSON.stringify(imgUrls));
        }, (err) => {
          if (err.error == "cordova_not_available") {
            alert("Cordova is not available, please make sure you have your app deployed on a simulator or device");
          } else {
            console.log("Failed to open albums: " + err.error);
          }
        });
    */
  }
  bShowError = false;
  bErrorText: string = 'Discount Rate & Days can not be left blank.';
  isValid() {
    var n = 0;
    for (var i = 0; i < this.oInputForm.value.discounts.length; i++) {
      var obj = this.oInputForm.value.discounts[i];
      var r = Number(obj.RATE);
      var d = Number(obj.ADVANCEDAYS);
      console.log(r + " " + d);
      if (r != 0 && d != 0) {
        n++;
      }
      if (r != 0 && d == 0) {
        return 0;
      }
      if (r == 0 && d != 0) {
        return 0;
      }
    }
    console.log(n);
    return n;
  }

  onSave(formData: any) {
    //    console.log(formData);
    this.bShowError = false;
    if (this.isValid() == 0) {
      this.bShowError = true;
      console.log("Error Discount / Days ");
      return;
    }
    formData.ISACTIVE = (formData.ISACTIVE) ? 'Y' : 'N';
    var me = this;
    this.loading = this.loadingCtrl.create({
      content: 'Uploading...',
    });
    if (this.PRODUCT_ID !== undefined) {
      this.bLoadingCtrl = true;
      this.loading.present();
      if (this.lastImage != null) {
        this.uploadImage();
      }
      this.oAPIService.send2ServerP("product/" + this.PRODUCT_ID + "/update", true, formData).then((data: any) => {
        //        console.log(JSON.stringify(data));
        //        console.log(JSON.stringify(me.oInputForm.value.discounts));
        this.oAPIService.send2ServerP("product/" +
          + this.PRODUCT_ID + "/discounts/delete", true).then((d: any) => {
          });
        me.oInputForm.value.discounts.forEach((obj => {
          //          console.log(JSON.stringify(obj));
          if (obj.RATE != '0' && obj.ADVANCEDAYS != '0') {
            this.oAPIService.send2ServerP("product/" +
              + this.PRODUCT_ID + "/discount/add", true, obj).then((d: any) => {
              });
          }
        }))
      }).catch((err) => {
        if (me.bLoadingCtrl) {
          me.bLoadingCtrl = false;
          this.loading.dismiss();
        }
        console.log('Error:' + JSON.stringify(err));
      }).then((d) => {
        if (this.bLoadingCtrl) {
          me.bLoadingCtrl = false;
          this.loading.dismiss();
          this.navCtrl.push("AddedInfoPage", { Updated: true });
        }
      });
    }
    else {
      if (this.lastImage == null) {
        //TODO: Show error dialogbox
        //then return ;
      }
      this.bLoadingCtrl = true;
      this.loading.present();
      this.oAPIService.send2ServerP("product/add", true, this.oInputForm.value).then((data: any) => {
        this.PRODUCT_ID = data.result[0].ID;
        if (this.lastImage != null) {
          this.uploadImage();
        }
        //        console.log(JSON.stringify(data));
        //        console.log(JSON.stringify(me.oInputForm.value.discounts));
        me.oInputForm.value.discounts.forEach((obj => {
          console.log(JSON.stringify(obj));
          if (obj.RATE != '0' && obj.ADVANCEDAYS != '0') {
            this.oAPIService.send2ServerP("product/" +
              + data.result[0].ID + "/discount/add", true, obj).then((d: any) => {
              });
          }
        }))
      }).catch((err) => {
        console.log('Error:' + JSON.stringify(err));
      });
    }
  }

  base64Image: any;
  accessGallery() {
    this.camera.getPicture({
      sourceType: this.camera.PictureSourceType.SAVEDPHOTOALBUM,
      //DataURL will return base64Image
      //      destinationType: this.camera.DestinationType.DATA_URL
      destinationType: this.camera.DestinationType.FILE_URI
    }).
      then((imageData) => {
        this.base64Image = 'data:image/jpeg;base64,' + imageData;
        this.uploadImage();
      }, (err) => {
        console.log(err);
      });
  }

  public takePicture(sourceType) {
    // Create options for the Camera Dialog
    var options = {
      quality: 100,
      sourceType: this.camera.PictureSourceType.SAVEDPHOTOALBUM,
      destinationType: this.camera.DestinationType.FILE_URI,
      //      sourceType: sourceType,
      saveToPhotoAlbum: false,
      correctOrientation: true
    };

    // Get the data of an image
    this.camera.getPicture(options).then((imagePath) => {
      // Special handling for Android library
      if (this.platform.is('android') && sourceType === this.camera.PictureSourceType.PHOTOLIBRARY) {
        this.filePath.resolveNativePath(imagePath)
          .then(filePath => {
            //            console.error(filePath);
            let correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
            let currentName = imagePath.substring(imagePath.lastIndexOf('/') + 1, imagePath.lastIndexOf('?'));
            this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
          });
      } else {
        var currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
        var correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
        this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
      }
    }, (err) => {
      this.presentToast('Error while selecting image.');
    });
  }
  // Create a new name for the image
  private createFileName() {
    var d = new Date(),
      n = d.getTime(),
      newFileName = n + ".jpg";
    //    console.error("createFileName: " + newFileName);
    return newFileName;
  }

  // Copy the image to a local folder
  private copyFileToLocalDir(namePath, currentName, newFileName) {
    this.file.copyFile(namePath, currentName, cordova.file.dataDirectory, newFileName).then(success => {
      this.lastImage = newFileName;
      //      console.error("Image created: " + this.lastImage);
    }, error => {
      this.presentToast('Error while storing file.');
    });
  }

  private presentToast(text) {
    let toast = this.toastCtrl.create({
      message: text,
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }

  // Always get the accurate path to your apps folder
  pathForImage(img) {
    if (img === null) {
      return '';
    } else {
      return cordova.file.dataDirectory + img;
    }
  }

  bLoadingCtrl: boolean = false;
  uploadImage() {
    if (this.bLoadingCtrl == false) {
      this.bLoadingCtrl = true;
      this.loading = this.loadingCtrl.create({
        content: 'Uploading...',
      });
      this.loading.present();
    }
    // Destination URL
    var url = sEndPoint + "api/upload/" + this.oLoginService.getUserID();

    // File for Upload
    var targetPath = this.pathForImage(this.lastImage);

    // File name only
    var filename = this.lastImage;

    //    console.log(filename);

    //    filename = this.createFileName ( ) ;
    var options: FileUploadOptions = {
      fileKey: "file",
      fileName: filename,
      headers: {},
      //      chunkedMode: true,
      //      mimeType: "multipart/form-data",
      //      params: { 'fileName': filename }
    };

    const fileTransfer: FileTransferObject = this.transfer.create();
    // Use the FileTransfer to upload the image
    fileTransfer.upload(targetPath, url, options).then(data => {
      //    fileTransfer.upload(this.base64Image, url, options).then(data => {
      //      this.loading.dismissAll()
      //      console.log(data);
      //      this.presentToast('Image succesful uploaded.' + data);
      this.oAPIService.send2ServerP("product/" + this.PRODUCT_ID + "/updateImage", true, { IMAGE_URL: data.response }).then((data: any) => {
        this.oItem.IMAGE_URL = data.response;
        this.lastImage = null;
        if (this.bLoadingCtrl) {
          this.bLoadingCtrl = false;
          this.loading.dismiss();
          this.navCtrl.push("AddedInfoPage");
        }
      });
    }, err => {
      if (this.bLoadingCtrl) {
        this.bLoadingCtrl = false;
        this.loading.dismiss();
      }
      this.presentToast('Error while uploading file.');
    });
  }

  /*
    base64Image: any;
    pickPicture() {
      Camera.getPicture({
        destinationType: Camera.DestinationType.DATA_URL,
        sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
        mediaType: Camera.MediaType.PICTURE
      }).then((imageData) => {
        // imageData is a base64 encoded string
        this.base64Image = "data:image/jpeg;base64," + imageData;
      }, (err) => {
        console.log(err);
      });
    }
  
    public myPhoto: any;
    public myPhotoURL: any;
    public error: string;
    private loading: Loading;
  
    takePhoto() {
          Camera.getPicture({
            quality: 100,
            destinationType: Camera.DestinationType.FILE_URI,
            sourceType: Camera.PictureSourceType.CAMERA,
            encodingType: Camera.EncodingType.PNG,
            saveToPhotoAlbum: true
          }).then(imageData => {
            this.myPhoto = imageData;
            this.uploadPhoto(imageData);
          }, error => {
            this.error = JSON.stringify(error);
          });
    }
  
    selectPhoto(): void {
      
          Camera.getPicture({
            sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
            destinationType: Camera.DestinationType.FILE_URI,
            quality: 100,
            encodingType: Camera.EncodingType.PNG,
          }).then(imageData => {
            this.myPhoto = imageData;
            this.uploadPhoto(imageData);
          }, error => {
            this.error = JSON.stringify(error);
          });
      
    }
    
    private uploadPhoto(imageFileUri: any): void {
      this.error = null;
      this.loading = this.loadingCtrl.create({
        content: 'Uploading...'
      });
  
      this.loading.present();
      // NNED TO FIX THIS
       //   File.resolveLocalFilesystemUrl(imageFileUri)
         //   .then(entry => (<FileEntry>entry).file(file => this.readFile(<Blob>file)))
           // .catch(err => console.log(err));
           //
    }
    private readFile(blob: Blob) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const formData = new FormData();
        const imgBlob = new Blob([reader.result], { type: blob.type });
        formData.append('file', imgBlob, (<any>blob).name);
        this.postData(formData);
      };
      reader.readAsArrayBuffer(blob);
    }
    
    private postData(formData: FormData) {
      this.http.post("http://192.168.178.20:8080/upload", formData)
        .catch((e) => this.handleError(e))
        .map(response => response.text())
        .finally(() => this.loading.dismiss())
        .subscribe(ok => this.showToast(ok));
    }
  */

  /*
  private showToast(ok: boolean) {
    if (ok) {
      const toast = this.toastCtrl.create({
        message: 'Upload successful',
        duration: 3000,
        position: 'top'
      });
      toast.present();
    }
    else {
      const toast = this.toastCtrl.create({
        message: 'Upload failed',
        duration: 3000,
        position: 'top'
      });
      toast.present();
    }
  }
  */

  /*
    private handleError(error: Response | any) {
      let errMsg: string;
      if (error instanceof Response) {
        const body = error.json() || '';
        const err = body.error || JSON.stringify(body);
        errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
      } else {
        errMsg = error.message ? error.message : error.toString();
      }
      this.error = errMsg;
      return Observable.throw(errMsg);
    }
  */
  getImageURL(oItem: any) {
    if (this.lastImage != null)
      return this.pathForImage(this.lastImage);
    return this.oAPIService.buildImageURL(oItem, this.oLoginService.getUserID(), '156h_');
    //    console.log("getImageURL: " + JSON.stringify(oItem));
    // if (oItem.IMAGE_URL === undefined || oItem.IMAGE_URL === null)
    //   return "";
    // let img = oItem.IMAGE_URL;
    // if (img.startsWith('http://') ||
    //   img.startsWith('https://'))
    //   return img;
    // return sIMAGE_URL + this.oLoginService.getUserID() + "/" + img;
  }
  isActive: boolean = false;
  notify(event) {
    console.log(event);
    this.isActive = event._value;
  }
  checkPermissions() {
    this.oDiagnostic.isCameraAuthorized().then((authorized) => {
      console.log("Camera: " + authorized);
      if (authorized) {
        this.onImageList();
        return;
      }
      let permission = this.oDiagnostic.permission;
      this.oDiagnostic.requestRuntimePermission(permission.CAMERA).then(
        success => {
          this.onImageList();
          console.log('reuqestCameraAuthroization, success', success);
        },
        error => {
          console.log('reuqestCameraAuthroization, error', error);
          this.toastCtrl.create(
            {
              message: "[" + error + "] Please go to your device settings and enable camera permissions.",
              position: "bottom",
              duration: 5000
            }
          ).present();
        },
      );

      // console.log("Requesting Camera Auth: " + authorized);
      // this.oDiagnostic.requestCameraAuthorization().then((status) => {
      //   console.log("Camera Auth Status: " + status);

      //   if (status == this.oDiagnostic.permissionStatus.GRANTED)
      //     this.onImageList();
      //   else {
      //     // Permissions not granted
      //     // Therefore, create and present toast
      //     this.toastCtrl.create(
      //       {
      //         message: "[" + status + "] Please go to your device settings and enable camera permissions.",
      //         position: "bottom",
      //         duration: 5000
      //       }
      //     ).present();
      //   }
      // });
    });
  }
}
