import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { Observable } from 'rxjs';
import { PopupService } from 'src/app/services/popup.service';

import { MAT_MOMENT_DATE_FORMATS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';

import * as _moment from 'moment';
import {default as _rollupMoment} from 'moment';
import { FormControl } from '@angular/forms';

const moment = _rollupMoment || _moment;

@Component({
  selector: 'app-analitik',
  templateUrl: './analitik.component.html',
  styleUrls: ['./analitik.component.scss'],
  providers: [
    // `MomentDateAdapter` and `MAT_MOMENT_DATE_FORMATS` can be automatically provided by importing
    // `MatMomentDateModule` in your applications root module. We provide it at the component level
    // here, due to limitations of our example generation script.
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS},
  ],
})
export class AnalitikComponent implements OnInit {

  date = new FormControl(moment());
  tgl;

  task;
  displayedColumns: string[] = ['id', 'cs', 'penerima', 'jumlah', 'total', 'status'];
  closing: Observable<any>;

  constructor(
    private dataService: DataService,
    private popup: PopupService,
    private adapter: DateAdapter<any>
    ) {
    this.adapter.setLocale('id');
    this.date.valueChanges.subscribe(tgl => {
      this.tgl = moment(tgl).format('YYYYMMDD');
    });
  }

  ngOnInit() {
  }

  tampil() {
    this.task = this.dataService.getClosing('tglDikirim', this.tgl).subscribe(res => {
      this.closing = res;
      console.log('Tampilkan tgl ' + this.tgl + ': ' + res);
    });
  }

}
