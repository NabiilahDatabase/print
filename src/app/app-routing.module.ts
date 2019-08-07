import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LabelComponent } from './components/label/label.component';
import { InvoiceComponent } from './components/invoice/invoice.component';

const routes: Routes = [
  { path: '', redirectTo: 'invoice', pathMatch: 'full' },
  { path: 'print', component: LabelComponent },
  { path: 'invoice', component: InvoiceComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
