import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';

import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { environment } from '../environments/environment';

import { NgPipesModule } from 'ngx-pipes';
import { NgxPrintModule } from 'ngx-print';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { LabelComponent } from './components/label/label.component';

import { DataService } from './services/data.service';
import { MaterialModule } from './modules/material.module';

import { InvoiceComponent } from './components/invoice/invoice.component';
import { AlertModule } from 'ngx-bootstrap';
import { MutasiComponent } from './components/mutasi/mutasi.component';
import { AnalitikComponent } from './components/analitik/analitik.component';

import { ScannerComponent } from './tool/scanner/scanner.component';

@NgModule({
  declarations: [
    AppComponent,
    LabelComponent,
    InvoiceComponent,
    MutasiComponent,
    AnalitikComponent,
    ScannerComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule,
    AngularFirestoreModule.enablePersistence(),
    AngularFireModule.initializeApp(environment.firebase),
    AlertModule.forRoot(),
    MaterialModule,
    NgxPrintModule,
    NgPipesModule,
    ZXingScannerModule,
  ],
  providers: [
    DataService
  ],
  bootstrap: [
    AppComponent
  ],
  entryComponents: [
    ScannerComponent
  ]
})
export class AppModule { }
