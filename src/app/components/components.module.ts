import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EncursoComponent } from './encurso/encurso.component';
import { IonicModule } from '@ionic/angular';
import { LoadingEncursoComponent } from './loading-encurso/loading-encurso.component';
import { RidersComponent } from './riders/riders.component';
import { EmptyScreenComponent } from './empty-screen/empty-screen.component';
import { OrdenesComponent } from './ordenes/ordenes.component';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { OrderCompleteComponent } from './order-complete/order-complete.component';


@NgModule({
  declarations: [
    EncursoComponent,
    LoadingEncursoComponent,
    RidersComponent,
    EmptyScreenComponent,
    OrdenesComponent,
    OrderDetailsComponent,
    OrderCompleteComponent
  ],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [
    EncursoComponent,
    LoadingEncursoComponent,
    RidersComponent,
    EmptyScreenComponent,
    OrdenesComponent,
    OrderDetailsComponent,
    OrderCompleteComponent
  ],
  entryComponents:[]
})
export class ComponentsModule { }