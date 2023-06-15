import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RiderPageRoutingModule } from './rider-routing.module';

import { RiderPage } from './rider.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RiderPageRoutingModule,
    ComponentsModule
  ],
  declarations: [RiderPage]
})
export class RiderPageModule {}
