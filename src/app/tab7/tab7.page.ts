import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';
import { EditarUsuarioPage } from '../editar-usuario/editar-usuario.page';

@Component({
  selector: 'app-tab7',
  templateUrl: './tab7.page.html',
  styleUrls: ['./tab7.page.scss'],
})
export class Tab7Page implements OnInit {
  pais: Observable<any[]>;
  terapeutas: Observable<any[]>;
  admins: Observable<any[]>;


  constructor(
    db: AngularFirestore,
    public fAuth: AngularFireAuth,
    public router: Router,
    public alertController: AlertController,
    public modalCtrl: ModalController
  ) {
    this.pais = db.collection('indice', ref =>
      ref.where('tipo', '==', 'pai')).valueChanges();
    this.terapeutas = db.collection('indice', ref =>
      ref.where('tipo', '==', 'terapeuta')).valueChanges();
    this.admins = db.collection('indice', ref =>
      ref.where('tipo', '==', 'adm')).valueChanges();
  }

  //Função que chama um alert
  async presentAlert2(mensagem) {
    const alert = await this.alertController.create({
      header: 'Atenção',
      message: mensagem,
      buttons: [
        {
          text: 'Fechar',
          role: 'cancel',
          cssClass: 'secondary'
        }, {
          text: 'Sair',
          handler: async () => {
            console.log('Saiu!');
            await this.fAuth.auth.signOut();
            this.router.navigate(['/']);


          }
        }
      ]
    });
    await alert.present();
  }


  async presentModal(item) {
    const modal = await this.modalCtrl.create({
      component: EditarUsuarioPage,
      componentProps: {
        item
      }
    });

    await modal.present();

  }

  sair() {
    this.presentAlert2('Realmente quer sair?');

  }

  ngOnInit() {
  }

}
