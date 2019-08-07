import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { Observable } from 'rxjs';
import { PopupService } from 'src/app/services/popup.service';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.scss']
})
export class InvoiceComponent implements OnInit {

  task;
  closing;
  id: string;

  constructor(
    private dataService: DataService,
    private popup: PopupService
    ) {
  }

  ngOnInit() {
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
