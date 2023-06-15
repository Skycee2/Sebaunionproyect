import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdminOrdenesPageRoutingModule } from './admin-ordenes-routing.module';

import { AdminOrdenesPage } from './admin-ordenes.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdminOrdenesPageRoutingModule
  ],
  declarations: [AdminOrdenesPage]
})
export class AdminOrdenesPageModule {}
