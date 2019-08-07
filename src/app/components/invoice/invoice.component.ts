import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { PopupService } from 'src/app/services/popup.service';
import { MatDialog } from '@angular/material';

import { ScannerComponent } from '../../tool/scanner/scanner.component';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.scss']
})
export class InvoiceComponent implements OnInit {

  qrResultString: string;

  task;
  closing;
  id: string;

  constructor(
    private dataService: DataService,
    private popup: PopupService,
    public dialog: MatDialog
    ) {
  }

  ngOnInit() {
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ScannerComponent, {
      width: '250px',
      data: {code: this.qrResultString}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.qrResultString = result;
    });
  }

  cari() {
    this.dataService.getClosingan(this.id).subscribe(res => {
      this.closing = res;
    });
  }

  gantiStatus(id: string, stat: string) {
    this.dataService.updateClosing(id, {status: stat});
  }

  hapus(item) {
    if (confirm('Yakin mau hapus invoice milik ' + item.penerima)) {
      this.dataService.deleteClosing(this.id);
      this.popup.showToast('Invoice milik ' + item.penerima + ' berhasil dihapus', 'Tutup');
    }
  }

}
