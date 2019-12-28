import { Component, ViewChild, ViewChildren } from '@angular/core';
import { AlertController, NavController, ModalController, LoadingController, Loading } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from
  '@angular/forms';
import { LoginErrorPage } from '../login-error/login-error';
// import { ForgotPasswordPage } from '../forgot-password/forgot-password';
//import { DBLoginPage } from '../db-login/db-login';
import { LoginService } from '../../providers/login-service';
import { SearchOptionsPage } from '../search-options/search-options';
//import { DatePickerComponent } from '../../components/date-picker/date-picker';
//import { SimpleAlert } from
'../../providers/simple-alert';
//import { PasswordResetMessagePage } from
'../password-reset-message/password-reset-message';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import { APIService } from '../../providers/api-service';
//import { Global_Variables } from '../../app/properties';
import { V, Global_Variables } from '../../app/properties';
//import { TextMaskModule } from 'angular2-text-mask';
// import { CardModule } from 'ngx-card/ngx-card';
// declare var Card:any ;
import { Storage } from '@ionic/storage';

// Aaa@gmail.com / aaaaaa
// 1 user1@user1.com                ocs18                
// 2 user2@user2.com                fff                  
// 3 Muser1@user1.com               aaa                  
// 4 Muser2@user2.com               fff  

//cordova plugin add cordova-plugin-facebook4 --save --variable APP_ID="1702614956729294" --variable APP_NAME="HaveItEarly"

@Component({

  selector: 'page-login',
  templateUrl: 'login.html',
  //  providers: [DatePickerComponent]
})
export class LoginPage {
  @ViewChild('ccn') public abc;
  @ViewChildren('cc') items;

  //https://github.com/ihym/ngx-card
  // messages: any = { validDate: 'valid\ndate', monthYear: 'mm/yyyy' };
  // placeholders: any = { number: '•••• •••• •••• ••••', name: 'Full Name', expiry: '••/••', cvc: '•••' };

  // masks: any;

  // formatting: boolean = true;

  // debug: boolean = false;

  //  FB_APP_ID: number = your_app_id;
  oInputForm: FormGroup;
  oCCForm: FormGroup;
  submitAttempt: false;
  testSlides: string[] = [];
  @ViewChild('mySlider') mySlider: any;
  loading: Loading;

  // public cardMask = ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];

  data: any = { email: "Muser1@user1.com", password: "aaa" };
  //  data: any = { email: "wpg@37.com", password: "aaaaaa" };
  constructor(public navCtrl: NavController, public oBuilder: FormBuilder
    //, private oPlatform: Platform
    , private modalCtrl: ModalController
    //, private viewCtrl: ViewController
    , public oStorage: Storage,
    private loadingCtrl: LoadingController,
    private oFB: Facebook, public oAPIService: APIService,
    private oLoginService: LoginService, public alertCtrl: AlertController
  ) {

    //    this.getCCForm ( ) ;
    this.oInputForm = this.oBuilder.group({
      email: [this.data.email, Validators.compose([Validators.maxLength(V.Email_Max), Validators.minLength(V.Email_Min), Validators.email, Validators.required])],
      password: [this.data.password, Validators.compose([Validators.maxLength(V.Password_Max), Validators.minLength(V.Password_Min), Validators.pattern(V.Password), Validators.required])]
      // password: ['', Validators.compose([Validators.maxLength(V.Password_Max), Validators.minLength(V.Password_Min), Validators.pattern(V.Password)])]
    });
    //      Facebook.browserInit(this.FB_APP_ID, "v2.8");
    // this.datePicker.onDateSelected.subscribe(
    //   (date) => {
    //     console.log(date);
    //   });
  }
  // ionViewDidEnter() {
  //   //    this.oInputForm.get("email").
  //   setTimeout(() => {
  //     console.log ( this.items ) ;
  //     var e: ElementRef = this.abc.getElementRef();
  //     var oInput = e ; //e.nativeElement.firstElementChild ;
  //     console.log(oInput); //   querySelector('ion-input'));
  //     var im = new Inputmask({ mask: "9999 9999 9999 9999"});
  //     im.mask(oInput);
  //     console.log(im);
  //   }, 1000);
  // }
  //   ionViewDidLoad() {
  // //    this.oInputForm.get("email").
  //     setTimeout(() => {
  //       var e:ElementRef = this.abc.getElementRef() ;
  //       console.log(e.);
  //       var im = new Inputmask("9999 9999 9999 9999");
  //         im.mask(e.nativeElement);          
  // }, 5000);
  //   }
  onForgotPassword() {
    this.navCtrl.push("ForgotPasswordPage");
  }

  /*
  declinedPermissions: [],
  provider: 'facebook',
  profile:{ 
  id: '121212121212121212',
  name: 'XYZ',
  email: 'xyz@gmail.com',
  first_name: 'XYZ',
  last_name: 'XYZ',
  age_range: { min: 21 },
  link: 'https://www.facebook.com/app_scoped_user_id/121212121212121212/',
  picture: { data: { is_silhouette: false,url: 'https://scontent.xx.fbcdn.net/v/t1.0-1/12/12.jpg?oh=12&oe=12' } },
  gender: 'male',
  locale: 'en_US',
  timezone: 5.5,
  updated_time: '2017-02-01T08:16:35+0000',verified: true },
  type: 'success',
  credentials: { 
  permissions: [ 'public_profile', 'contact_email', 'user_friends', 'email' ],
  tokenExpirationDate: '2017-05-13T14:56:36.690+0530',
  userId: '1212121212121212121',
  token:'ababababababababbababababa' }
  
  */
  fbLogin() {
    //    console.log("In fbLogin");
    //    var me = this;
    // this.oFB.getLoginStatus().then((status) => {
    //   status.log('STATUS');
    //   this.oAPIService.send2ServerP("log", true, status).then((d) => {

    //   }) ;
    // });
    let params = new Array();
    this.oFB.api('/me/permissions?method=DELETE', params).then((response) => {
      //      response.log('DELETE');
      //      this.oAPIService.send2ServerP("log", true, response).then(//(d) => { 
      //     }) ;
    });
    this.oFB.logout().then((res) => {
      //     res.log('LOGOUT');
      //     this.oAPIService.send2ServerP("log", true, res).then((d) //=> {     
      //     }) ;
    });

    // let params = new Array();
    // var sUserID = res.authResponse.userID;
    // this.oFB.api("/" + sUserID + '/me/permissions?method=DELETE', params).then((response) => {
    //   console.log(response); // true
    // }) ;
    this.oFB.login(['public_profile', 'user_friends', 'email'])
      .then((res: FacebookLoginResponse) => {
        //        console.log('Logged into Facebook!', JSON.stringify(res));
        this.oAPIService.send2ServerP("log", true, res);
        var sUserID = res.authResponse.userID;
        let params = new Array();
        this.oFB.api('/me?fields=name,email,gender', params).then((user) => {
          user.picture = "https://graph.facebook.com/" + sUserID + "/picture?type=large";
          //now we have the users info, let's save it in the NativeStorage
          //          this.oAPIService.send2ServerP("log", true, user);
          this.oLoginService.performFBLogin(user).then((data) => {
            //                console.log("Logged In " + JSON.stringify(data));
            this.oLoginService.saveToken(data.id_token);
            if (this.oLoginService.getUserType() == 'C')
              this.navCtrl.setRoot(SearchOptionsPage);
            // else
            //   if (this.oLoginService.getUserType() == 'M')
            //     this.navCtrl.setRoot(MerchantHomePage);
            //   else {
            //     console.log("Login OK: But neither Merchant nor Customer => " + this.oLoginService.getUserType());
            //   }
          });

          //          alert(JSON.stringify(user));
        }).catch((e) => {
          this.oAPIService.send2ServerP("log", true, e);
        })
        /*
            this.oLoginService.performFBLogin(data)
              .then((data) => {
                this.bError = false;
                console.log("Logged In " + JSON.stringify(data));
                this.oLoginService.saveToken(data.id_token);
                if (this.oLoginService.getUserType() == 'C')
                  this.navCtrl.setRoot(SearchOptionsPage);
                // else
                //   if (this.oLoginService.getUserType() == 'M')
                //     this.navCtrl.setRoot(MerchantHomePage);
                //   else {
                //     console.log("Login OK: But neither Merchant nor Customer => " + this.oLoginService.getUserType());
                //   }
              })
              .catch((err) => {
                this.bError = true;
                me.showLoginError();
                //   let alert = this.alertCtrl.create({
                //    title: '',
                //    cssClass: 'alertDanger',
                //    subTitle: 'Invalid email and password.',
                //    buttons: ['Ok']
                //  });
                //       alert.present();

                //          console.log("Login Failed");
                console.log(err);
              })
          }
          this.navCtrl.pop();
          this.navCtrl.push(LoginPage);
        }
        });
          */
      })
      .catch(e => console.log('Error logging into Facebook', e));

    //  }) ;


    // this.oFaceBook.login().then(() => {
    //   this.oFaceBook.getCurrentUserProfile().then(
    //     (profileData) => {
    //       console.log(JSON.stringify(profileData));
    //       // this.email = profileData.email;
    //       // this.name = profileData.name;
    //       // this.id = profileData.id;
    //     }
    //   );
    // });
    // let permissions = new Array<string>();
    // let nav = this.navCtrl;
    // //the permissions your facebook app needs from the user
    // permissions = ["public_profile"];

    // Facebook.login(permissions)
    // .then(function(response){
    //   let userId = response.authResponse.userID;
    //   let params = new Array<string>();

    //   //Getting name and gender properties
    //   Facebook.api("/me?fields=name,gender", params)
    //   .then(function(user) {
    //     user.picture = "https://graph.facebook.com/" + userId + "/picture?type=large";
    //     //now we have the users info, let's save it in the NativeStorage
    //     NativeStorage.setItem('user',
    //     {
    //       name: user.name,
    //       gender: user.gender,
    //       picture: user.picture
    //     })
    //     .then(function(){
    //       nav.push(SearchResultPage);
    //     }, function (error) {
    //       console.log(error);
    //     })
    //   })
    // }, function(error){
    //   console.log(error);
    // });
    //this.navCtrl.setRoot(FBLoginPage);
    //    this.navCtrl.setRoot(SearchResultPage);
  }

  ionViewWillEnter() {
    if (this.oLoginService.getToken() == null) {
      //      console.log("Not Logged In Previously");
      this.oStorage.get('UserEmail').then(s => {
        Global_Variables.sUserEmail = s;
        this.oInputForm.controls['email'].setValue(s);
      })
    }
    else
      this.navCtrl.setRoot(SearchOptionsPage);
  }

  bDebug = false;
  DBLogin(formData: any) {

    this.loading = this.loadingCtrl.create({
      content: 'authenticating...'
    });
    this.loading.present();
    this.oLoginService.performLogin(formData)
      .then((data) => {
        Global_Variables.sUserEmail = formData.email;
        this.oStorage.set('UserEmail', Global_Variables.sUserEmail);

        //        console.log("Logged In " + JSON.stringify(data));
        this.oLoginService.saveToken(data.id_token);
        this.loading.dismiss();
        if (this.oLoginService.getUserType() == 'C')
          //            this.navCtrl.setRoot(TestPage) ;
          this.navCtrl.setRoot(SearchOptionsPage);
        else
          if (this.oLoginService.getUserType() == 'M')
            this.navCtrl.setRoot('MerchantHomePage');
          else {
            console.log("Login OK: But neither Merchant nor Customer => " + this.oLoginService.getUserType());
          }
      })
      .catch((err) => {
        this.loading.dismiss();
        //        if (Global_Variables.isConnected)
        if (err !== 'No Network')
          this.showLoginError();
        //        else
        //          this.oAPIService.showNetworkError();
        //   let alert = this.alertCtrl.create({
        //    title: '',
        //    cssClass: 'alertDanger',
        //    subTitle: 'Invalid email and password.',
        //    buttons: ['Ok']
        //  });
        //       alert.present();

        //          console.log("Login Failed");
        console.log(err);
      })
  }

  // getCCForm() {
  //   this.oCCForm = this.oBuilder.group({
  //     CCA: ['5', Validators.compose([Validators.maxLength(4), Validators.minLength(4), Validators.required])],
  //     CCB: ['4', Validators.compose([Validators.maxLength(4), Validators.minLength(4), Validators.required])],
  //     CCC: ['3', Validators.compose([Validators.maxLength(4), Validators.minLength(4), Validators.required])],
  //     CCD: ['1', Validators.compose([Validators.maxLength(4), Validators.minLength(4), Validators.required])],
  //     CCMM: ['05', Validators.compose([Validators.maxLength(2), Validators.minLength(1), Validators.required])],
  //     CCYY: ['17', Validators.compose([Validators.maxLength(2), Validators.minLength(1), Validators.required])],
  //     CCV: ['8', Validators.compose([Validators.maxLength(3), Validators.minLength(3), Validators.required])],
  //     CCN: ['Walter', Validators.compose([Validators.maxLength(25), Validators.minLength(3), Validators.required])]
  //   });
  // }
  onRegister() {
    this.navCtrl.push('RegisterPage');
  }
  signUp(any) {
    //    this.navCtrl.push(ProfilePage, { signUp: true });
    console.log('sign up');
  }
  // showCalendar() {
  //   this.datePicker.showCalendar();
  // }
  showLoginError() {
    let oModal = this.modalCtrl.create(LoginErrorPage);
    //, { enableBackdropDismiss: false });
    oModal.onDidDismiss(data => {
      console.log(data);
    });
    oModal.present();
    //    oModal.present(oModal);
  }
  // showAlert() {
  //   let oModal = this.modalCtrl.create(PasswordResetMessagePage, { userId: 8675309 });
  //   //, { enableBackdropDismiss: false });
  //   oModal.onDidDismiss(data => {
  //     console.log(data);
  //   });
  //   oModal.present(oModal);
  // }
  /*
  //https://github.com/muhammedMoussa/ionic2-alerts/blob/master/app.ts
  showAlert(){
 
     let alert = this.alertCtrl.create({
       title: 'Alert Title!',
       subTitle: 'This is subtitle',
       buttons: ['Ok']
     });
 
     alert.present();
 
   }
 
  private _htmlProperty: string = "<p><span name=\"alarm\" style=\"display:inline-block;font-family:Ionicons;\" class=\"icon icon-md ion-md-alarm\"></span> 26 février 2016</p><p><div name=\"pin\" style=\"display:inline-block;font-family:Ionicons;\" class=\"icon icon-md ion-md-alarm\"></div> 52, rue des Paquerette</p>";
 
   public htmlProperty() {
     return this._sanitizer.bypassSecurityTrustHtml(this._htmlProperty);
   }
 
   openAppointmentPop() {
     let appointmentpop = this.alertCtrl.create({
       title: 'Rendez-vous',
       message: <any> this.htmlProperty(),
       buttons: [
         {
           text: 'Modifier',
           handler: () => {
             console.log('Disagree clicked');
           }
         },
         {
           text: 'Retour',
           handler: () => {
             console.log('Agree clicked');
           }
         }
       ]
     });
     appointmentpop.present();
   }
 */
}
