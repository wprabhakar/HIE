webpackJsonp([9],{

/***/ 1042:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AddMenuPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_api_service__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_login_service__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_image_picker__ = __webpack_require__(169);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__app_env_properties__ = __webpack_require__(163);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_file__ = __webpack_require__(170);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_native_file_transfer__ = __webpack_require__(498);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ionic_native_file_path__ = __webpack_require__(171);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__ionic_native_camera__ = __webpack_require__(172);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__ionic_native_diagnostic__ = __webpack_require__(164);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__app_properties__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__PriceValidator__ = __webpack_require__(1043);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





//import { Camera } from "@ionic-native/camera";
//import { FileEntry, File } from "@ionic-native/file";
//import { LoadingController, Loading, ToastController } from "ionic-angular";
// import "rxjs/add/operator/map";
// import "rxjs/add/operator/catch";
// import 'rxjs/add/observable/throw';


//import { sIMAGE_URL } from '../../app/properties';
//import { AddedInfoPage } from '../added-info/added-info';







//https://github.com/dtaalbers/ionic-2-examples/blob/master/file-transfer-upload/app/services/plugins.service.ts
var AddMenuPage = /** @class */ (function () {
    //  oDiscountInfo: FormArray ;
    //http://stackoverflow.com/questions/38007236/how-to-dynamically-add-and-remove-form-fields-in-angular-2
    function AddMenuPage(navCtrl, navParams, oBuilder, 
    //private androidPermissions: AndroidPermissions,
    oDiagnostic, loadingCtrl, oAPIService, oLoginService, oImagePicker, toastCtrl, platform, camera, transfer, file, filePath) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.oBuilder = oBuilder;
        this.oDiagnostic = oDiagnostic;
        this.loadingCtrl = loadingCtrl;
        this.oAPIService = oAPIService;
        this.oLoginService = oLoginService;
        this.oImagePicker = oImagePicker;
        this.toastCtrl = toastCtrl;
        this.platform = platform;
        this.camera = camera;
        this.transfer = transfer;
        this.file = file;
        this.filePath = filePath;
        this.bSignUp = false;
        this.PRODUCT_ID = 0;
        this.oDiscounts = [{ RATE: 0, ADVANCEDAYS: 0 }];
        this.oItem = { TITLE: '', DESCRIPTION: '', USUAL_PRICE: '', ISACTIVE: 'N' };
        this.bLoaded = false;
        this.oTitle = "Add menu";
        this.bNoImage = true;
        this.lastImage = null;
        //  http://plnkr.co/edit/XTeH1ifQTJSoMvBEvE0d?p=preview
        this.validDiscountDays = function (fg) {
            //    console.log(fg.controls['RATE'].value);
            //    console.log(fg.controls['ADVANCEDAYS'].value);
            // fg.controls['RATE'].validator = null;
            // fg.controls['ADVANCEDAYS'].validator = null;
            var oR = fg.controls['RATE'].value;
            var oA = fg.controls['ADVANCEDAYS'].value;
            console.log("Validing [" + oR + "] [" + oA + "]");
            var errors = fg.controls['RATE'].errors ? fg.controls['RATE'].errors : {};
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
        };
        this.bShowError = false;
        this.bErrorText = 'Discount Rate & Days can not be left blank.';
        this.bLoadingCtrl = false;
        this.isActive = false;
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
    AddMenuPage.prototype.getBgColor = function (fg, s) {
        var oR = fg.controls['RATE'].value;
        var oA = fg.controls['ADVANCEDAYS'].value;
        if ((+oR != 0 && +oA != 0) || (+oR + +oA) == 0)
            return 'ksd-valid';
        if (s == 'RATE' && +oR == 0)
            return 'ksd-invalid';
        if (s == 'ADVANCEDAYS' && +oA == 0)
            return 'ksd-invalid';
        return 'ksd-valid';
    };
    AddMenuPage.prototype.populateFormData = function () {
        var _this = this;
        this.oInputForm = this.oBuilder.group({
            TITLE: [this.oItem.TITLE, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].compose([__WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].maxLength(__WEBPACK_IMPORTED_MODULE_12__app_properties__["b" /* V */].MenuTitle_Max), __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].minLength(__WEBPACK_IMPORTED_MODULE_12__app_properties__["b" /* V */].MenuTitle_Min), __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required])],
            DESCRIPTION: [this.oItem.DESCRIPTION, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].compose([__WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].maxLength(__WEBPACK_IMPORTED_MODULE_12__app_properties__["b" /* V */].MenuDescription_Max), __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].minLength(__WEBPACK_IMPORTED_MODULE_12__app_properties__["b" /* V */].MenuDescription_Min), __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required])],
            USUAL_PRICE: [this.oItem.USUAL_PRICE, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].compose([__WEBPACK_IMPORTED_MODULE_13__PriceValidator__["a" /* PriceValidator */].validPrice, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required])],
            ISACTIVE: [this.oItem.ISACTIVE == 'Y'],
            discounts: this.oBuilder.array([]),
        });
        var arrayControl = this.oInputForm.controls['discounts'];
        this.oDiscounts.forEach(function (o) {
            var oD = _this.oBuilder.group({
                RATE: [o.RATE],
                ADVANCEDAYS: [o.ADVANCEDAYS]
            });
            //, this.validDiscountDays
            // {
            //     validator: (fg: FormGroup) => {
            //       return this.validDiscountDays(fg);
            //     }
            //        }
            //   );
            arrayControl.push(oD);
        });
        for (var i = this.oDiscounts.length; i < 4; i++)
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
    };
    AddMenuPage.prototype.loadProduct = function () {
        var _this = this;
        this.oAPIService.send2ServerP("product/" + this.PRODUCT_ID).then(function (data) {
            _this.oItem = data.result[0];
            console.log(JSON.stringify(_this.oItem));
            _this.oAPIService.send2ServerP("product/" + _this.PRODUCT_ID + "/discounts").then(function (d) {
                _this.oDiscounts = d.result;
                _this.bNoImage = false;
                _this.populateFormData();
            });
        });
    };
    AddMenuPage.prototype.addInput = function () {
        var _this = this;
        var arrayControl = this.oInputForm.controls['discounts'];
        var oD = this.oBuilder.group({
            RATE: [0],
            ADVANCEDAYS: [0]
        }, {
            validator: function (fg) {
                return _this.validDiscountDays(fg);
            }
        });
        arrayControl.push(oD);
    };
    AddMenuPage.prototype.delInput = function (index) {
        var arrayControl = this.oInputForm.controls['discounts'];
        arrayControl.removeAt(index);
    };
    AddMenuPage.prototype.openAlbum = function () {
        return this.oImagePicker.getPictures({
            quality: 100,
            maximumImagesCount: 15,
        });
    };
    AddMenuPage.prototype.onImageList = function () {
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
    };
    AddMenuPage.prototype.isValid = function () {
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
    };
    AddMenuPage.prototype.onSave = function (formData) {
        var _this = this;
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
            this.oAPIService.send2ServerP("product/" + this.PRODUCT_ID + "/update", true, formData).then(function (data) {
                //        console.log(JSON.stringify(data));
                //        console.log(JSON.stringify(me.oInputForm.value.discounts));
                _this.oAPIService.send2ServerP("product/" +
                    +_this.PRODUCT_ID + "/discounts/delete", true).then(function (d) {
                });
                me.oInputForm.value.discounts.forEach((function (obj) {
                    //          console.log(JSON.stringify(obj));
                    if (obj.RATE != '0' && obj.ADVANCEDAYS != '0') {
                        _this.oAPIService.send2ServerP("product/" +
                            +_this.PRODUCT_ID + "/discount/add", true, obj).then(function (d) {
                        });
                    }
                }));
            }).catch(function (err) {
                if (me.bLoadingCtrl) {
                    me.bLoadingCtrl = false;
                    _this.loading.dismiss();
                }
                console.log('Error:' + JSON.stringify(err));
            }).then(function (d) {
                if (_this.bLoadingCtrl) {
                    me.bLoadingCtrl = false;
                    _this.loading.dismiss();
                    _this.navCtrl.push("AddedInfoPage", { Updated: true });
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
            this.oAPIService.send2ServerP("product/add", true, this.oInputForm.value).then(function (data) {
                _this.PRODUCT_ID = data.result[0].ID;
                if (_this.lastImage != null) {
                    _this.uploadImage();
                }
                //        console.log(JSON.stringify(data));
                //        console.log(JSON.stringify(me.oInputForm.value.discounts));
                me.oInputForm.value.discounts.forEach((function (obj) {
                    console.log(JSON.stringify(obj));
                    if (obj.RATE != '0' && obj.ADVANCEDAYS != '0') {
                        _this.oAPIService.send2ServerP("product/" +
                            +data.result[0].ID + "/discount/add", true, obj).then(function (d) {
                        });
                    }
                }));
            }).catch(function (err) {
                console.log('Error:' + JSON.stringify(err));
            });
        }
    };
    AddMenuPage.prototype.accessGallery = function () {
        var _this = this;
        this.camera.getPicture({
            sourceType: this.camera.PictureSourceType.SAVEDPHOTOALBUM,
            //DataURL will return base64Image
            //      destinationType: this.camera.DestinationType.DATA_URL
            destinationType: this.camera.DestinationType.FILE_URI
        }).
            then(function (imageData) {
            _this.base64Image = 'data:image/jpeg;base64,' + imageData;
            _this.uploadImage();
        }, function (err) {
            console.log(err);
        });
    };
    AddMenuPage.prototype.takePicture = function (sourceType) {
        var _this = this;
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
        this.camera.getPicture(options).then(function (imagePath) {
            // Special handling for Android library
            if (_this.platform.is('android') && sourceType === _this.camera.PictureSourceType.PHOTOLIBRARY) {
                _this.filePath.resolveNativePath(imagePath)
                    .then(function (filePath) {
                    //            console.error(filePath);
                    var correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
                    var currentName = imagePath.substring(imagePath.lastIndexOf('/') + 1, imagePath.lastIndexOf('?'));
                    _this.copyFileToLocalDir(correctPath, currentName, _this.createFileName());
                });
            }
            else {
                var currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
                var correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
                _this.copyFileToLocalDir(correctPath, currentName, _this.createFileName());
            }
        }, function (err) {
            _this.presentToast('Error while selecting image.');
        });
    };
    // Create a new name for the image
    AddMenuPage.prototype.createFileName = function () {
        var d = new Date(), n = d.getTime(), newFileName = n + ".jpg";
        //    console.error("createFileName: " + newFileName);
        return newFileName;
    };
    // Copy the image to a local folder
    AddMenuPage.prototype.copyFileToLocalDir = function (namePath, currentName, newFileName) {
        var _this = this;
        this.file.copyFile(namePath, currentName, cordova.file.dataDirectory, newFileName).then(function (success) {
            _this.lastImage = newFileName;
            //      console.error("Image created: " + this.lastImage);
        }, function (error) {
            _this.presentToast('Error while storing file.');
        });
    };
    AddMenuPage.prototype.presentToast = function (text) {
        var toast = this.toastCtrl.create({
            message: text,
            duration: 3000,
            position: 'top'
        });
        toast.present();
    };
    // Always get the accurate path to your apps folder
    AddMenuPage.prototype.pathForImage = function (img) {
        if (img === null) {
            return '';
        }
        else {
            return cordova.file.dataDirectory + img;
        }
    };
    AddMenuPage.prototype.uploadImage = function () {
        var _this = this;
        if (this.bLoadingCtrl == false) {
            this.bLoadingCtrl = true;
            this.loading = this.loadingCtrl.create({
                content: 'Uploading...',
            });
            this.loading.present();
        }
        // Destination URL
        var url = __WEBPACK_IMPORTED_MODULE_6__app_env_properties__["b" /* sEndPoint */] + "api/upload/" + this.oLoginService.getUserID();
        // File for Upload
        var targetPath = this.pathForImage(this.lastImage);
        // File name only
        var filename = this.lastImage;
        //    console.log(filename);
        //    filename = this.createFileName ( ) ;
        var options = {
            fileKey: "file",
            fileName: filename,
            headers: {},
        };
        var fileTransfer = this.transfer.create();
        // Use the FileTransfer to upload the image
        fileTransfer.upload(targetPath, url, options).then(function (data) {
            //    fileTransfer.upload(this.base64Image, url, options).then(data => {
            //      this.loading.dismissAll()
            //      console.log(data);
            //      this.presentToast('Image succesful uploaded.' + data);
            _this.oAPIService.send2ServerP("product/" + _this.PRODUCT_ID + "/updateImage", true, { IMAGE_URL: data.response }).then(function (data) {
                _this.oItem.IMAGE_URL = data.response;
                _this.lastImage = null;
                if (_this.bLoadingCtrl) {
                    _this.bLoadingCtrl = false;
                    _this.loading.dismiss();
                    _this.navCtrl.push("AddedInfoPage");
                }
            });
        }, function (err) {
            if (_this.bLoadingCtrl) {
                _this.bLoadingCtrl = false;
                _this.loading.dismiss();
            }
            _this.presentToast('Error while uploading file.');
        });
    };
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
    AddMenuPage.prototype.getImageURL = function (oItem) {
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
    };
    AddMenuPage.prototype.notify = function (event) {
        console.log(event);
        this.isActive = event._value;
    };
    AddMenuPage.prototype.checkPermissions = function () {
        var _this = this;
        this.oDiagnostic.isCameraAuthorized().then(function (authorized) {
            console.log("Camera: " + authorized);
            if (authorized) {
                _this.onImageList();
                return;
            }
            var permission = _this.oDiagnostic.permission;
            _this.oDiagnostic.requestRuntimePermission(permission.CAMERA).then(function (success) {
                _this.onImageList();
                console.log('reuqestCameraAuthroization, success', success);
            }, function (error) {
                console.log('reuqestCameraAuthroization, error', error);
                _this.toastCtrl.create({
                    message: "[" + error + "] Please go to your device settings and enable camera permissions.",
                    position: "bottom",
                    duration: 5000
                }).present();
            });
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
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", Array)
    ], AddMenuPage.prototype, "oDiscounts", void 0);
    AddMenuPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-add-menu',template:/*ion-inline-start:"/Users/krisprojects/HIEv2/HIE/HIEApp/src/pages/add-menu/add-menu.html"*/'<ion-header>\n\n  <ion-navbar>\n    <ion-title>{{oTitle}}</ion-title>\n  </ion-navbar>\n  <!-- Upload todo -->\n  <!--//https://www.joshmorony.com/advanced-forms-validation-in-ionic-2/-->\n</ion-header>\n<ion-content>\n  <div *ngIf="bLoaded">\n    <div class="ksd-spacer-top"></div>\n    <ion-row padding>\n      <ion-col>\n        <div class="image-container">\n          <img [src]="getImageURL(oItem)" />\n          <div class="after">\n            <button icon-left ion-button full class="ksd-upload-button" full (click)="checkPermissions()">\n              <ion-icon class="ksd-icon" name="md-camera">\n                <span class="ksd-upload-text">Upload</span>\n              </ion-icon>\n            </button>\n            <div *ngIf="bNoImage">please upload image</div>\n          </div>\n          <!-- <div class="after">\n            <button class="ksd-upload-button" ion-button full (click)="checkPermissions()"><ion-icon name="md-camera"></ion-icon> Upload</button>\n          </div> -->\n        </div>\n      </ion-col>\n    </ion-row>\n    <!--https://blog.khophi.co/new-changes-ionic-2-forms-examples/-->\n    <form [formGroup]="oInputForm" (ngSubmit)="onSave(oInputForm.value)">\n      <ion-row>\n        <ion-col>\n          <ion-item>\n            <ion-label floating>Menu title</ion-label>\n            <ion-input formControlName="TITLE" type="text"></ion-input>\n          </ion-item>\n          <ion-item>\n            <ion-label floating>Description</ion-label>\n            <ion-input text-justify formControlName="DESCRIPTION" type="textarea"></ion-input>\n          </ion-item>\n\n          <ion-item>\n            <ion-label floating>Original price</ion-label>\n            <ion-input formControlName="USUAL_PRICE" type="number"></ion-input>\n          </ion-item>\n\n        </ion-col>\n      </ion-row>\n      <div class="ksd-spacer-1"></div>\n      <!-- <ion-row no-padding>\n        <ion-col width-80 class="no-padding">\n          <ion-label class="label-heading">Discount rate</ion-label>\n        </ion-col>\n        <ion-col class="no-padding">\n          <ion-label class="label-heading">Days</ion-label>\n        </ion-col>\n      </ion-row>\n      <ion-row>\n      </ion-row> -->\n      <!-- <ion-item>\n      </ion-item> -->\n      <ion-row>\n        <ion-col>\n          <div formArrayName="discounts" *ngFor="let control of oInputForm.controls[\'discounts\'].controls; let i = index">\n            <ion-row [formGroup]="oInputForm.controls.discounts.controls[i]">\n              <ion-col width-50 text-left>\n                <ion-item class="ksd-select">\n                  <ion-label>Rate</ion-label>\n                  <ion-select text-left formControlName="RATE" [class]="getBgColor(oInputForm.controls[\'discounts\'].controls[i], \'RATE\')">\n                    <ion-option value="0" checked="true">Discount Rate</ion-option>\n                    <ion-option value="20">20%</ion-option>\n                    <ion-option value="15">15%</ion-option>\n                    <ion-option value="10">10%</ion-option>\n                  </ion-select>\n                </ion-item>\n                <!-- <div>\n                  {{oInputForm.controls[\'discounts\'].controls[i].get(\'RATE\').valid}}.\n                </div> -->\n<!-- \n                <div>\n                  {{oInputForm.controls[\'discounts\'].controls[0].get(\'RATE\').errors}}\n                </div>\n                <div *ngIf="oInputForm.controls.discounts.controls[i].get(\'RATE\').errors">\n                  required\n                </div> -->\n              </ion-col>\n              <ion-col width-50 text-left>\n                <ion-item class="ksd-select">\n                  <ion-label>Days</ion-label>\n                  <ion-select text-left formControlName="ADVANCEDAYS"  [class]="getBgColor(oInputForm.controls[\'discounts\'].controls[i], \'ADVANCEDAYS\')">\n                    <ion-option value="0" checked="true">Days</ion-option>\n                    <ion-option value="5">5</ion-option>\n                    <ion-option value="2">2</ion-option>\n                    <ion-option value="1">1</ion-option>\n                  </ion-select>\n                </ion-item>\n                <!-- <div>\n                  {{oInputForm.controls[\'discounts\'].controls[i].get(\'ADVANCEDAYS\').valid}}.\n                </div> -->\n                <div *ngIf="oInputForm.controls.discounts.controls[i].get(\'ADVANCEDAYS\').errors">\n                  required\n                </div>\n              </ion-col>\n            </ion-row>\n            <!--<discount [myForm]="oInputForm.controls.discounts.controls[i]"></discount>-->\n          </div>\n        </ion-col>\n      </ion-row>\n      <ion-row *ngIf="bShowError">\n        <ion-col col-2></ion-col>\n        <ion-col col-10>\n          <p class="alert">{{bErrorText}}</p>\n        </ion-col>\n      </ion-row>\n      <div class="ksd-spacer-1"></div>\n      <!-- <ion-item no-padding>\n      </ion-item> -->\n      <ion-row>\n        <ion-col col-10>\n          <ion-label class="ksd-active-label">Show to customer</ion-label>\n        </ion-col>\n        <ion-col col-2>\n          <div class="ksd-toggle-background">\n            <ion-toggle read-only item-right [checked]="oItem.ISACTIVE == \'Y\'" formControlName="ISACTIVE" id="ISACTIVE"></ion-toggle>\n          </div>\n          <!--(ionChange)="notify($event)"></ion-toggle>-->\n        </ion-col>\n      </ion-row>\n      <ion-item>\n      </ion-item>\n      <div class="ksd-spacer-1"></div>\n    </form>\n    <!--<p *ngIf="submitAttempt" style="color: #ea6153;">Please fill out all details accurately.</p>-->\n  </div>\n\n</ion-content>\n<ion-footer>\n  <button primary ion-button full type="submit" [disabled]="!oInputForm.valid" (click)="onSave(oInputForm.value)">\n    <p class="ksd-anchor-button">Save</p>\n  </button>\n</ion-footer>\n'/*ion-inline-end:"/Users/krisprojects/HIEv2/HIE/HIEApp/src/pages/add-menu/add-menu.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavController"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavParams"], __WEBPACK_IMPORTED_MODULE_2__angular_forms__["FormBuilder"],
            __WEBPACK_IMPORTED_MODULE_11__ionic_native_diagnostic__["a" /* Diagnostic */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["LoadingController"],
            __WEBPACK_IMPORTED_MODULE_3__providers_api_service__["a" /* APIService */],
            __WEBPACK_IMPORTED_MODULE_4__providers_login_service__["a" /* LoginService */],
            __WEBPACK_IMPORTED_MODULE_5__ionic_native_image_picker__["a" /* ImagePicker */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["ToastController"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["Platform"],
            __WEBPACK_IMPORTED_MODULE_10__ionic_native_camera__["a" /* Camera */], __WEBPACK_IMPORTED_MODULE_8__ionic_native_file_transfer__["a" /* FileTransfer */], __WEBPACK_IMPORTED_MODULE_7__ionic_native_file__["a" /* File */], __WEBPACK_IMPORTED_MODULE_9__ionic_native_file_path__["a" /* FilePath */]])
    ], AddMenuPage);
    return AddMenuPage;
}());

//# sourceMappingURL=add-menu.js.map

/***/ }),

/***/ 1043:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PriceValidator; });
var PriceValidator = /** @class */ (function () {
    function PriceValidator() {
    }
    PriceValidator.validPrice = function (fc) {
        if (isNaN(fc.value) == false) {
            if (parseFloat(fc.value) > 1.0 && parseFloat(fc.value) <= 999.99)
                return ({ validPrice: true });
        }
        return (null);
    };
    return PriceValidator;
}());

//# sourceMappingURL=PriceValidator.js.map

/***/ }),

/***/ 857:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AddMenuPageModule", function() { return AddMenuPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__add_menu__ = __webpack_require__(1042);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var AddMenuPageModule = /** @class */ (function () {
    function AddMenuPageModule() {
    }
    AddMenuPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__add_menu__["a" /* AddMenuPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["IonicPageModule"].forChild(__WEBPACK_IMPORTED_MODULE_2__add_menu__["a" /* AddMenuPage */]),
            ],
            exports: [
                __WEBPACK_IMPORTED_MODULE_2__add_menu__["a" /* AddMenuPage */]
            ]
        })
    ], AddMenuPageModule);
    return AddMenuPageModule;
}());

//# sourceMappingURL=add-menu.module.js.map

/***/ })

});
//# sourceMappingURL=9.js.map