import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FirestoreService } from 'src/app/services/firestore.service';
import { AlertController, LoadingController } from '@ionic/angular';
import { DatePipe } from '@angular/common';
import { Orden } from 'src/app/interface/models';

@Component({
  selector: 'app-solicitud',
  templateUrl: './solicitud.page.html',
  styleUrls: ['./solicitud.page.scss'],
})
export class SolicitudPage implements OnInit {
  solicitudForm: FormGroup;
  currentUserUid: string;

  constructor(
    private formBuilder: FormBuilder,
    private firestoreService: FirestoreService,
    private alertController: AlertController,
    private loadingController: LoadingController,
    private datePipe: DatePipe
  ) {}

  ngOnInit() {
    this.solicitudForm = this.formBuilder.group({
      tipo_envio: ['', Validators.required],
      direccion_origen: ['', Validators.required],
      comuna_orig: ['', Validators.required],
      direccion_entrega: ['', Validators.required],
      comuna_entr: ['', Validators.required],
      nombre_contacto: ['', Validators.required],
      telefono_contacto: ['', Validators.required],
      instrucciones_entrega: ['', Validators.required],
      fecha_entrega: [''],
      hora_estimada_entrega: ['', Validators.required],
      id: [''],
      creado_por: ['']
    });

    // Obtener el uid del usuario actual
    this.currentUserUid = this.firestoreService.getUid();
  }

  async presentAlert(message: string) {
    const alert = await this.alertController.create({
      header: 'Solicitar Orden',
      message: message,
      buttons: ['Aceptar'],
    });
    await alert.present();
  }

  async solicitarOrden() {
    if (this.solicitudForm.invalid) {
      this.presentAlert('Por favor, complete todos los campos obligatorios.');
      return;
    }
  
    const loading = await this.loadingController.create({
      message: 'Solicitando orden...',
      spinner: 'crescent',
      translucent: true,
    });
    await loading.present();
  
    const currentDate = new Date();
    const formattedDate = this.datePipe.transform(currentDate, 'yyyy-MM-dd');
    this.solicitudForm.patchValue({ fecha_entrega: formattedDate });
  
    const orden: Orden = this.solicitudForm.value;
  
    this.firestoreService
      .crearOrden(orden)
      .then((ordenId) => {
        // Obtener el uid de la orden creada
        orden.id = ordenId; // Asignar el uid a la propiedad id del objeto orden
        return ordenId; // Devolver el uid
      })
      .then((uid) => {
        this.presentAlert('Orden solicitada exitosamente');
        this.solicitudForm.reset();
        console.log('uid de la orden:', uid); // Imprimir el uid en la consola
      })
      .catch((error) => {
        this.presentAlert('Error al solicitar la orden');
        console.log(error);
      })
      .finally(() => {
        loading.dismiss();
      });
  }
}