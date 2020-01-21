import { Component, OnInit, ViewChild } from '@angular/core';
import { PdfService } from 'src/app/services/pdf.service';
import { DataService, Stock } from 'src/app/services/data.service';
import { PopupService } from 'src/app/services/popup.service';
import { Sort } from '@angular/material/sort';
import { ModalDirective } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-print-gudang',
  templateUrl: './print-gudang.component.html',
  styleUrls: ['./print-gudang.component.scss']
})
export class PrintGudangComponent implements OnInit {

  stock: Stock[]; task;
  stockSorted: Stock[];

  options; option; selected = -1;

  @ViewChild('konfirmasiModal') public konfirmasiModal: ModalDirective;

  constructor(
    private pdf: PdfService,
    private data: DataService,
    private popup: PopupService,
  ) {
    this.options = this.pdf.getOptions();
    this.task = this.data.getStockGudang().subscribe(res => {
      this.stock = res;
      this.stockSorted = res.slice();
      // console.log(res);
    });
  }

  ngOnInit() {
  }
  pilihLabel(name) {
    this.selected = this.options.findIndex(data => data.name === name);
  }
  printLabel() {
    const stock = this.stockSorted.sort((a, b) => (a.nama > b.nama) ? 1 : ((b.nama > a.nama) ? -1 : 0));
    this.pdf.printPDFLabel(stock, 'Label_Gudang', {labelMerk: this.selected, statusPrint: 'stock' });
    this.stockSorted = this.stock.slice();
    this.konfirmasiModal.show();
  }

  sortData(sort: Sort) {
    const data = this.stock.slice();
    if (!sort.active || sort.direction === '') {
      this.stockSorted = data;
      return;
    }
    this.stockSorted = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'id': return compare(a.id, b.id, isAsc);
        case 'nama': return compare(a.nama, b.nama, isAsc);
        case 'warna': return compare(a.warna, b.warna, isAsc);
        case 'toko': return compare(a.toko, b.toko, isAsc);
        case 'hargabeli': return compare(a.hargabeli, b.hargabeli, isAsc);
        case 'hargajual': return compare(a.hargajual, b.hargajual, isAsc);
        case 'statusbarang': return compare(a.statusbarang, b.statusbarang, isAsc);
        default: return 0;
      }
    });
  }

  selesai() {
    this.data.updateStockDiprint(this.stock).then(
      () => {
        this.popup.showToast('Berhasil print semua label!', 'Tutup');
        this.konfirmasiModal.hide();
      },
      (err) => { alert(err); }
    );
    // if (confirm('Yakin sudah di print semua?')) {
    // }
  }

}

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
