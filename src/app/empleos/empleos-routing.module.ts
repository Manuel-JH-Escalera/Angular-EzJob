import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EmpleosPage } from './empleos.page';

const routes: Routes = [
  {
    path: '',
    component: EmpleosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmpleosPageRoutingModule {}
