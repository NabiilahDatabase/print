import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { Orderan, DataService } from 'src/app/services/data.service';
import { PdfService } from 'src/app/services/pdf.service';

import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Sort } from '@angular/material/sort';
import { PopupService } from 'src/app/services/popup.service';
import { FormControl } from '@angular/forms';
import * as moment from 'moment';

export interface Dessert {
  calories: number;
  carbs: number;
  fat: number;
  name: string;
  protein: number;
}

@Component({
  selector: 'app-list-ambilan',
  templateUrl: './list-ambilan.component.html',
  styleUrls: ['./list-ambilan.component.scss']
})
export class ListAmbilanComponent implements OnInit {

  orderan: Orderan[]; task;
  orderanSorted: Orderan[];
  estimasi = 0;

  @Input() printRumah: boolean;
  options; option; selected = -1;

  date = new FormControl(moment());
  tahun = new Date().getFullYear().toString();
  bulan = ('0' + (new Date().getMonth() + 1)).slice(-2);
  hari = ('0' + (new Date().getDate())).slice(-2);

  constructor(
    private pdf: PdfService,
    private data: DataService,
    private popup: PopupService,
  ) {
    this.task = this.data.getOrderan(this.tahun + this.bulan + this.hari).subscribe(res => {
      this.orderan = res;
      this.hitungEstimasi(res);
      this.orderanSorted = res.slice();
    });
    this.printRumah = false;
    this.options = this.pdf.getOptions();
  }

  ngOnInit() {
  }

  pilihLabel(name) {
    this.selected = this.options.findIndex((data: any) => data.name === name);
    console.log(this.selected);
  }

  gantiTgl(event) {
    this.tahun = event.value._i.year.toString();
    this.bulan = ('0' + (event.value._i.month + 1)).slice(-2).toString();
    this.hari = ('0' + event.value._i.date).slice(-2).toString();
    console.log(this.tahun, this.bulan, this.hari);
    this.task = this.data.getOrderan(this.tahun + this.bulan + this.hari).subscribe(res => {
      this.orderan = res;
      this.hitungEstimasi(res);
      this.orderanSorted = res.slice();
    });
  }

  printLabel() {
    const orderanRumah = this.orderan
      .filter(d => d.toko === 'RUMAH')
      .sort((a, b) => (a.barang > b.barang) ? 1 : ((b.barang > a.barang) ? -1 : 0)); // sort nama barang
    let orderanTmp = this.orderan
      .filter(d => d.toko !== 'RUMAH') // exclude RUMAH
      .sort((a, b) => (a.toko > b.toko) ? 1 : ((b.toko > a.toko) ? -1 : 0)); // sort data per toko
    if (this.printRumah) {
      orderanTmp = orderanTmp.concat(orderanRumah); // push RUMAH
    }
    this.pdf.printPDFLabel(orderanTmp, 'Label_Ambilan', {labelMerk: this.selected, statusPrint: 'ambilan' });
  }
  printNota(orderanGroup) {
    this.pdf.printPDFNota(orderanGroup);
  }

  sortData(sort: Sort) {
    const data = this.orderan.slice();
    if (!sort.active || sort.direction === '') {
      this.orderanSorted = data;
      return;
    }
    this.orderanSorted = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'barang': return compare(a.barang, b.barang, isAsc);
        case 'warna': return compare(a.warna, b.warna, isAsc);
        case 'cs': return compare(a.cs, b.cs, isAsc);
        case 'penerima': return compare(a.penerima, b.penerima, isAsc);
        case 'toko': return compare(a.toko, b.toko, isAsc);
        case 'hargaBeli': return compare(a.hargaBeli, b.hargaBeli, isAsc);
        case 'barcode': return compare(a.barcode, b.barcode, isAsc);
        case 'status': return compare(a.status, b.status, isAsc);
        default: return 0;
      }
    });
  }

  hitungEstimasi(res: Orderan[]) {
    this.estimasi = 0;
    res.forEach(o => {
      this.estimasi += o.hargaBeli;
    });
  }

  hapus(orderan: Orderan) {
    if (confirm(`Hapus <strong>${orderan.barang} ${orderan.warna}</strong> milik admin ${orderan.cs}?`)) {
      this.data.deleteOrderan(orderan.id);
      this.popup.showToast('Ambilan milik ' + orderan.penerima + ' berhasil dihapus', 'Tutup');
    }
  }

  onDestroy() {
    this.task.unsubscribe();
  }

}

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
