import { Component, OnInit } from '@angular/core';
import { FirestoreService } from 'src/app/services/firestore.service';
import { LoadingController, AlertController } from '@ionic/angular';
import { Orden } from 'src/app/interface/models';
import { Usuario } from 'src/app/interface/models';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-admin-ordenes',
  templateUrl: './admin-ordenes.page.html',
  styleUrls: ['./admin-ordenes.page.scss'],
})
export class AdminOrdenesPage implements OnInit {
  ordenes: any[] = []; // lista de órdenes
  motociclistas: Usuario[];
  motociclistaSeleccionado: string = '';

  constructor(
    private firestoreService: FirestoreService,
    private loadingController: LoadingController,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    this.cargarOrdenes();
    this.firestoreService.obtenerOrdenes();
    this.firestoreService.getMotociclistas().subscribe((motociclistas: Usuario[]) => {
      console.log(motociclistas); // Verificar los datos obtenidos
      this.motociclistas = motociclistas;
    });
  
    this.obtenerOrdenes(); // Agregar esta línea
  }

  cargarOrdenes() {
    this.firestoreService.getDatosFire('ordenes').subscribe(
      (datosfb) => {
        this.ordenes = [];
        for (let orden of datosfb) {
          let ord = orden.payload.doc.data();
          ord['id'] = orden.payload.doc.id;
          this.ordenes.push(ord);
          this.cargarDatosOrden(ord);
        }
      }
    );
  }

  obtenerOrdenes() {
    // Iterar sobre las órdenes para obtener el motociclista asignado
    for (let orden of this.ordenes) {
      // Verificar si el motociclista está asignado
      if (orden.motociclista) {
        // Obtener el nombre del motociclista asignado
        const motociclista = this.motociclistas.find(m => m.uid === orden.motociclista);
        if (motociclista) {
          // Asignar el nombre del motociclista a la propiedad motociclistaSeleccionado
          orden.motociclistaSeleccionado = motociclista.nom_rso;
        }
      }
    }
  }

  async asignarOrden(orden: Orden) {
    const loading = await this.loadingController.create({
      message: 'Asignando motociclista...',
      spinner: 'crescent',
      translucent: true,
    });
    await loading.present();

    try {
      await this.firestoreService.modificarOrden(orden.id, { motociclista: this.motociclistaSeleccionado });
      this.presentAlert('Motociclista asignado exitosamente');
    } catch (error) {
      this.presentAlert('Error al asignar el motociclista');
      console.log(error);
    } finally {
      loading.dismiss();
    }
  }
  
  cargarDatosOrden(orden: any) {
    // Aquí puedes realizar llamadas adicionales a Firebase u otras operaciones para cargar los datos necesarios para mostrar la orden
  }

  async presentAlert(message: string) {
    const alert = await this.alertController.create({
      header: 'Alerta',
      message: message,
      buttons: ['OK'],
    });
    await alert.present();
  }

}
