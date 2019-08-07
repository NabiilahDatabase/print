import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { Observable } from 'rxjs';
import { PopupService } from 'src/app/services/popup.service';

@Component({
  selector: 'app-mutasi',
  templateUrl: './mutasi.component.html',
  styleUrls: ['./mutasi.component.scss']
})
export class MutasiComponent implements OnInit {

  task;
  displayedColumns: string[] = ['id', 'cs', 'penerima', 'jumlah', 'total', 'status'];
  closing: Observable<any>;

  constructor(
    private dataService: DataService,
    private popup: PopupService,
    ) {
    this.task = this.dataService.getClosing('Cek Mutasi').subscribe(res => {
      this.closing = res;
    });
  }

  ngOnInit() {
  }

  dibayar(item) {
    this.dataService.updateClosing(item.id, {status: 'Dibayar', wktDicek: this.dataService.getTimeNow()});
    this.popup.showToast(item.penerima + 'telah membayar', 'Sembunyikan');
  }

  showBarang(barang) {
    let listBarang = '';
    barang.map(item => {
      listBarang += item.nama + ' ';
    });
    this.popup.showToast(listBarang, 'Tutup');
  }

  onDestroy() {
    this.task.unsubscribe();
  }
}
