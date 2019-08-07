import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LabelComponent } from './components/label/label.component';
import { InvoiceComponent } from './components/invoice/invoice.component';
import { MutasiComponent } from './components/mutasi/mutasi.component';
import { AnalitikComponent } from './components/analitik/analitik.component';

const routes: Routes = [
  { path: '', redirectTo: 'mutasi', pathMatch: 'full' },
  { path: 'print', component: LabelComponent },
  { path: 'invoice', component: InvoiceComponent },
  { path: 'mutasi', component: MutasiComponent },
  { path: 'analitik', component: AnalitikComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
