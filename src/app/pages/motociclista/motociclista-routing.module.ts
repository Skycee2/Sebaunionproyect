import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MotociclistaPage } from './motociclista.page';

const routes: Routes = [
  {
    path: '',
    component: MotociclistaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MotociclistaPageRoutingModule {}
