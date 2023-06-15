import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminOrdenesPage } from './admin-ordenes.page';

const routes: Routes = [
  {
    path: '',
    component: AdminOrdenesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminOrdenesPageRoutingModule {}
