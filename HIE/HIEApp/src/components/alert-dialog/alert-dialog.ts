import { Component, Output, EventEmitter } from "@angular/core";
import { ModalController, Modal, ViewController } from 'ionic-angular';
//
// https://alligator.io/ionic/modals/
@Component({
  selector: 'alert-dialog',
  templateUrl: 'alert-dialog.html'
})
export class AlertDialogComponent {
  @Output()
  public onOKPressed: EventEmitter<any> = new EventEmitter<any>();

  @Output()
  public onCancelled: EventEmitter<any> = new EventEmitter<any>();

  text: string;
  private oModal: Modal;
  oSelection: any ;

  constructor(public modalCtrl: ModalController, public viewCtrl: ViewController) {
    this.text = 'Hello World';
    this.text = "Email to reset your password have been sent to<br><p text-center>wpg@37.com</p><br>Please check your email." ;
  }

  show(message: any) {
    this.text = message ;
    this.oModal = this.modalCtrl.create(AlertDialogComponent) ;
    //, {}, { enableBackdropDismiss: false});
    this.oModal.onDidDismiss((data: any) => {
      if (data) {
        this.onOKPressed.emit();
      }
      else {
        this.onCancelled.emit();
      }
    });
    this.oModal.present();
  }

  private ok() {
    this.oSelection = "OK" ;
    this.viewCtrl.dismiss(this.oSelection);
  }

  private cancel() {
    this.viewCtrl.dismiss();
  }
}
