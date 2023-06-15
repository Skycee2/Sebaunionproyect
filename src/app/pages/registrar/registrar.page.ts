import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import { FirestoreService } from 'src/app/services/firestore.service';
import { AlertController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.page.html',
  styleUrls: ['./registrar.page.scss'],
})
export class RegistrarPage implements OnInit {




  usuario = new FormGroup({
    rut: new FormControl('', [Validators.required, Validators.pattern('[0-9]{1,2}.[0-9]{3}.[0-9]{3}-[0-9kK]{1}')]),
    nom_rso: new FormControl('', [Validators.required, Validators.minLength(5)]),
    direccion: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    tipo_usuario: new FormControl('', [Validators.required]),
    telefono: new FormControl('', [Validators.required, Validators.pattern('[0-9]{0,9}')]),
    nom_usuario: new FormControl('', [Validators.required,
    Validators.minLength(6),
    Validators.maxLength(20)]),
    password: new FormControl('', [Validators.required,
    Validators.minLength(6),
    Validators.maxLength(18)]),
    uid: new FormControl('')
  });

  //Variable para validar campos
  verificar_password: string;
  buscarUsu: any = '';
  buscarEmail: any = '';

  usuarios: any[] = [];


  constructor(
    private usuarioService: UsuarioService,
    private router: Router,
    private firestoreService: FirestoreService,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private firestore: AngularFirestore) { }

  ngOnInit() {
    this.cargarDatos();
    //this.usuarios = this.usuarioService.obtenerUsuarios();
  }

  //Métodos para poder usar fire
  cargarDatos(){
    this.firestoreService.getDatosFire('usuarios').subscribe(
      datosfb => {
        this.usuarios = [];
        for(let usuario of datosfb){
          // console.log(usuario.payload.doc.data());
          let usu = usuario.payload.doc.data();
          usu['uid'] = usuario.payload.doc.id;
          this.usuarios.push(usu);
        }
      }
    );
  }


  async registrar() {

  
    const loading = await this.loadingController.create({
      message: 'Registrando usuario...',
      spinner: 'crescent',
      translucent: true
    });
    await loading.present();

    if (this.usuario.controls.password.value !== this.verificar_password) {
      this.presentAlert('Las contraseñas no coinciden');
      return;
    }
    // verificar rut
    if (!this.usuarioService.validarRut(this.usuario.controls.rut.value)) {
      return this.presentAlert('Rut invalido, reintente')
    }

    this.buscarUsu = this.usuarios.find(u => u.rut == this.usuario.value.rut);

    this.buscarEmail = this.usuarios.find(u => u.email == this.usuario.value.email);

     if(this.buscarUsu != undefined){
      this.presentAlert('El rut ya está registrado.');
    }else if(this.buscarEmail != undefined){
      this.presentAlert('El correo ya está registrado.')
    };


    this.firestoreService.registrarUsuario(this.usuario.value)
      .then(() => {
        this.usuario.reset();
        this.presentAlert('Usuario registrado exitosamente');
        this.router.navigate(['/admin-usuarios']);
      })
      .catch((error) => {
        this.presentAlert('Error al registrar usuario');
        console.log(error)
      })
      .finally(() => {
        loading.dismiss();
      }); 

      //verificar registro
      this.cargarDatos();
      this.usuario.reset();
      this.verificar_password = '';

      
  }

  async presentAlert(message: string) {
    const alert = await this.alertController.create({
      header: 'Registro',
      message: message,
      buttons: ['Aceptar']
    });
    await alert.present();
  }


}

