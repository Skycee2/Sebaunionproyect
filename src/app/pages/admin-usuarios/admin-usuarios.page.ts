import { Component, OnInit } from '@angular/core';
import { FirestoreService } from 'src/app/services/firestore.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-admin-usuarios',
  templateUrl: './admin-usuarios.page.html',
  styleUrls: ['./admin-usuarios.page.scss'],
})
export class AdminUsuariosPage implements OnInit {

  usuarios: any[] = []; // lista de usuarios
  usuariosFiltrados: any[] = []; // lista filtrada de usuarios
  textoBusqueda: string = ''; // texto de busqueda

  constructor(private firestoreService: FirestoreService,
    private loadingController: LoadingController,
    private alertController: AlertController,) { }

  ngOnInit() {
    this.cargarUsuarios();
  }

  cargarUsuarios() {
    this.firestoreService.getDatosFire('usuarios').subscribe(
      (datosfb) => {
        this.usuarios = [];
        for (let usuario of datosfb) {
          let usu = usuario.payload.doc.data();
          usu['uid'] = usuario.payload.doc.id;
          this.usuarios.push(usu);
        }
      }
    );
  }

  filtroUsuarios() {
    // convierte el texto de busqueda a minuscula
    const busqueda = this.textoBusqueda.toLowerCase();

    this.usuariosFiltrados = this.usuarios.filter((usuario) => 
    usuario.nom_rso.toLowerCase().includes(busqueda) ||
    usuario.rut.toLowerCase().inclues(busqueda) ||
    usuario.email.toLowerCase().includes(busqueda) ||
    usuario.direccion.toLowerCase().includes(busqueda) ||
    usuario.telefono.toLowerCase().includes(busqueda) ||
    usuario.nom_usuario.toLowerCase().includes(busqueda) ||
    usuario.tipo_cliente.toLowerCase().includes(busqueda) 
    );
  }

  limpiarBusqueda() {
    this.textoBusqueda = ''; // restablecer el texto de bsuqeuda
    this.filtroUsuarios(); // vuelve a aplicar el filtrado para mostrar todos los usuarios
  }

  
  

  async modificarUsuario(usuario: any) {
    const alert = await this.alertController.create({ // alert con los campos que se pueden modificar
      header: 'Modificar usuario',
      inputs: [
        {
          name: 'direccion',
          type: 'text',
          value: usuario.direccion,
          placeholder: 'Dirección',
        },
        {
          name: 'telefono',
          type: 'text',
          value: usuario.telefono,
          placeholder: 'Teléfono',
        },
        {
          name: 'nom_usuario',
          type: 'text',
          value: usuario.nom_usuario,
          placeholder: 'Nombre de Usuario',
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
        },
        {
          text: 'Guardar',
          handler: (data) => {
            const nuevoUsuario = {
              direccion: data.direccion,
              telefono: data.telefono,
              nombreUsuario: data.nom_usuario,
            };

            this.firestoreService
              .modificarUsuario(usuario.uid, nuevoUsuario) // metodo para guardar el usuario modificado en la bd
              .then(() => {
                console.log('Usuario modificado exitosamente');
                this.presentAlert('Usuario modificado exitosamente');
                this.cargarUsuarios(); // actualiza lista de usuarios cono datos modificados
              })
              .catch((error) => {
                console.error('Error al modificar usuario:', error);
              });
          },
        },
      ],
    });

    await alert.present();
  }


  async eliminarUsuario(usuario: any) {
    const alert = await this.alertController.create({
      header: 'Confirmar eliminación',
      message: '¿Estás seguro de que deseas eliminar este usuario?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
        },
        {
          text: 'Eliminar',
          handler: () => {
            this.firestoreService
              .eliminarUsuario(usuario.uid)
              .then(() => {
                console.log('Usuario modificado exitosamente');
                this.presentAlert('Usuario eliminado exitosamente'); // Mostrar el mensaje de alerta
                this.cargarUsuarios();
              })
              .catch((error) => {
                console.error('Error al eliminar usuario:', error);
              });
          },
        },
      ],
    });
  
    await alert.present();
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

  /*

  async modificar(usuario: any) {
    // Verificar password
    if (this.usuario.controls.password.value != this.verificar_password) {
      return this.presentAlert('CONTRASEÑAS NO COINCIDEN!');
    }
  
    // Verificar rut
    if (!this.validacionesService.validarRut(this.usuario.controls.rut.value)) {
      return this.presentAlert('RUT INVALIDO, VUELVA A INTENTAR');
    }
  
    await this.cargandoPantalla('Modificando...');
  
    let usr = this.usuario.value;
    this.firestService.updateFire('usuarios', usuario.id, usr)
      .then(() => {
        console.log('Usuario modificado exitosamente');
        this.usuario.reset();
        this.cargarDatos();
      })
      .catch((error) => {
        console.error('Error al modificar usuario:', error);
      });
  }
  
  async eliminar(id: string) {
    this.firestoreService.deleteFire('usuarios', id)
      .then(() => {
        console.log('Usuario eliminado exitosamente');
        this.cargandoPantalla('Eliminando...').then(() => {
          this.cargarDatos();
        });
      })
      .catch((error) => {
        console.error('Error al eliminar usuario:', error);
      });
  }

  //Método para mostrar "cargando pantalla"
  async cargandoPantalla(message){
    const cargando = await this.loadingController.create({
      message,
      duration: 1500,
      spinner: 'lines-small'
    });

    cargando.present();
  } */

