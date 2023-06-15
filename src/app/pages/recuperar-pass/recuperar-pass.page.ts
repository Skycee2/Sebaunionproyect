import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-recuperar-pass',
  templateUrl: './recuperar-pass.page.html',
  styleUrls: ['./recuperar-pass.page.scss'],
})
export class RecuperarPassPage implements OnInit {

  usuarios: any[] = [];
  email: string = '';
  buscarEmail: any = '';

  constructor(
    private toastController: ToastController, 
    private router: Router, 
    private alertController: AlertController,
    private firestore: AngularFirestore,
    private usuarioService: UsuarioService
  ) { }

  ngOnInit() {
  }

  async recuperarContra(){
    this.buscarEmail = this.usuarios.find(u => u.email == this.email);
    if(this.buscarEmail != undefined){
      this.presentAlert('Contraseña enviada al correo')
    }else{
      this.tstError();
    }
  }

  async tstError() {
    const toast = await this.toastController.create({
      message: 'Correo no registrado',
      duration: 3000
    });
    toast.present();
  }

  async presentAlert(mensaje:string) {
    const alert = await this.alertController.create({
      header: mensaje,
      message: '',
      buttons: ['OK'],
    });

    await alert.present();
  }

}


