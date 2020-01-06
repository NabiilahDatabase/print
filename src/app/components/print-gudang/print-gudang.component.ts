import { Component, OnInit } from '@angular/core';
import { PdfService } from 'src/app/services/pdf.service';
import { DataService } from 'src/app/services/data.service';
import { PopupService } from 'src/app/services/popup.service';
import { Sort } from '@angular/material/sort';

@Component({
  selector: 'app-print-gudang',
  templateUrl: './print-gudang.component.html',
  styleUrls: ['./print-gudang.component.scss']
})
export class PrintGudangComponent implements OnInit {

  stock;
  StockSorted;

  options; option; selected = -1;

  constructor(
    private pdf: PdfService,
    private data: DataService,
    private popup: PopupService,
  ) {
    this.options = this.pdf.getOptions();
  }

  ngOnInit() {
  }
  pilihLabel(name) {
    console.log(this.selected);
    this.selected = this.options.findIndex(data => data.name === name);
    console.log(this.selected);
  }
  printLabel() {}

  sortData(sort: Sort) {
    const data = this.stock.slice();
    if (!sort.active || sort.direction === '') {
      this.StockSorted = data;
      return;
    }
    this.StockSorted = data.sort((a, b) => {
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

}

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
