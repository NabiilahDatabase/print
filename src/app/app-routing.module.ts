import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LabelComponent } from './components/label/label.component';
import { InvoiceComponent } from './components/invoice/invoice.component';
import { MutasiComponent } from './components/mutasi/mutasi.component';
import { AnalitikComponent } from './components/analitik/analitik.component';
import { ScannerComponent } from './tool/scanner/scanner.component';
import { ListAmbilanComponent } from './components/list-ambilan/list-ambilan.component';
import { PrintGudangComponent } from './components/print-gudang/print-gudang.component';

const routes: Routes = [
  { path: '', redirectTo: 'mutasi', pathMatch: 'full' },
  { path: 'print', component: LabelComponent },
  { path: 'invoice', component: InvoiceComponent },
  { path: 'mutasi', component: MutasiComponent },
  { path: 'analitik', component: AnalitikComponent },
  { path: 'list-ambilan', component: ListAmbilanComponent },
  { path: 'print-gudang', component: PrintGudangComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [
    RouterModule,
  ]
})
export class AppRoutingModule { }
