import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MotociclistaPageRoutingModule } from './motociclista-routing.module';

import { MotociclistaPage } from './motociclista.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MotociclistaPageRoutingModule
  ],
  declarations: [MotociclistaPage]
})
export class MotociclistaPageModule {}
