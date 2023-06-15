import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { NavigationExtras, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from 'src/app/services/usuario.service';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {



//vamos a crear variables:
usuarios: any [] = [];


usuario = new FormGroup({
  email: new FormControl('', [Validators.required, Validators.email]),
  password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]),
});


  constructor(    private toastController: ToastController,
    private router: Router,
    private usuarioService: UsuarioService, 
    private firestore: FirestoreService,
    private alertController: AlertController,
    private loadingController: LoadingController
  ) { }

  ngOnInit() {
  }

  async login() {

    const loading = await this.loadingController.create({
      message: 'Iniciando sesión...',
      spinner: 'circular',
    });
    await loading.present();
  
    this.usuarioService.login(this.usuario.value.email, this.usuario.value.password)
      .then(() => {
        loading.dismiss();
        this.router.navigateByUrl('/home');
      })
      .catch((error) => {
        loading.dismiss();
        this.presentAlert('Error', 'Usuario o contraseña incorrectos');
      });
  }
  async presentAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK'],
    });
    await alert.present();
  }

  async tostadaError() {
    const toast = await this.toastController.create({
      message: 'usuario o contraseña incorrectos.',
      duration: 3000
    });
    toast.present();
  }


  


  /*
 
  async login() {
    const loading = await this.loadingController.create({
      message: 'Iniciando sesión...',
      spinner: 'circular',
    });
    await loading.present();

    this.usuarioService.login(this.usuario.value.email, this.usuario.value.password)
      .then(() => {
        loading.dismiss();
        const usuarioLogin = this.usuarios.find(usu => usu.email === this.usuario.value.email);
        if (usuarioLogin) {
          const navigationExtras: NavigationExtras = {
            state: {
              usuario: usuarioLogin
            }
          };
          this.router.navigate(['/home/tabs/perfil' + usuarioLogin.rut], navigationExtras);
          this.usuario.reset();
        } else {
          this.presentAlert('Error', 'Usuario no encontrado');
        }
      })
      .catch((error) => {
        loading.dismiss();
        this.presentAlert('Error', 'Usuario o contraseña incorrectos');
      });
  }



  //método para ingresar a home, adaptado:
  login(){

    //Obtener valores en variables por separado
    var validarCorreo = this.usuario.controls.email.value;
    var validarPassw = this.usuario.controls.password.value;

    //Variables para validar login
    var valida: boolean = this.firestore.loginFire(validarCorreo, validarPassw, this.usuarios)
    var usuarioLogin = this.usuarios.find(usu => usu.email == validarCorreo && usu.password == validarPassw);

    //validar si existe el usuario en la información traida de frbs
    if(valida != false){
      let navigationExtras: NavigationExtras = {
        state:{
          usuario: usuarioLogin
        }
      };
      //Según el tipo de usuario, se redirige al home respectivo
      this.router.navigate(['/home/perfil/'+usuarioLogin.rut], navigationExtras);
      this.firestore.isAutenticated.next(true);
      this.usuario.reset();
    }else{
      this.tostadaError();
    }
  }

  //toast
  async tostadaError() {
    const toast = await this.toastController.create({
      message: 'Usuario o contraseña incorrectos.',
      duration: 3000
    });
    toast.present();
  } */


}