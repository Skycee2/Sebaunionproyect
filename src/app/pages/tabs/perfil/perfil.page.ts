import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
import { FirestoreService } from 'src/app/services/firestore.service';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  uid: string = null
  usuarioLogueado: any = null
  telefonoActual: number = null;

  constructor(private usuarioService: UsuarioService, private firestoreService: FirestoreService, private alertController: AlertController) { }

  async ngOnInit() {
    console.log('Estoy en el perfil');
    this.usuarioService.usuarioLogueado.subscribe((usuario: any) => {
      this.usuarioLogueado = usuario;
      console.log('Usuario logueado:', this.usuarioLogueado);
    });

    try {
      this.uid = await this.getUid();
      const email = this.usuarioLogueado?.email;
      if (email) {
        this.firestoreService.getUsuarioByEmail(email).subscribe((querySnapshot) => {
          if (!querySnapshot.empty) {
            const usuario: { telefono?: number } = querySnapshot.docs[0].data();
            this.telefonoActual = usuario?.telefono;
          }
        });
      }
    } catch (error) {

    }
  

    const email = this.usuarioLogueado?.email;
    if (email) {
      this.firestoreService.getUsuarioByEmail(email).subscribe((querySnapshot) => {
        if (!querySnapshot.empty) {
          const usuario: { telefono?: number } = querySnapshot.docs[0].data();
          this.telefonoActual = usuario?.telefono;
        }
      });
    }
  }

  async getUid(): Promise<string> {
    const uid = this.firestoreService.getUid();
    if (uid) {
      console.log('Usuario UID:', uid);
      return uid;
    } else {
      
      throw new Error('No se encontró UID de usuario');
    }
  }

  async presentAlertPrompt() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Modificar número de telefono',
      inputs: [
        {
          name: 'telefono',
          type: 'number',
          placeholder: 'Ingresa numero de telefono'
      },
    ],
    buttons: [
      {
        text: 'Cancelar',
        role: 'cancel',
        cssClass: 'secondary',
        handler: () => {
          console.log('Confirm cancel');
        }
      },
      {
        text: 'Aceptar',
        handler: (data) => {
          const nuevoTelefono = data.telefono;
          this.firestoreService
            .modificarUsuario(this.uid, { telefono: nuevoTelefono })
            .then(() => {
              console.log('Número de teléfono modificado exitosamente');
              this.telefonoActual = nuevoTelefono; // Actualizar el número de teléfono actual en el componente
            })
            .catch((error) => {
              console.error('Error al modificar número de teléfono:', error);
            });
        },
      }
    ]
    });
    await alert.present();
  }

}
