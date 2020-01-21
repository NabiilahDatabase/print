import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';

import { DataService } from '../../services/data.service';
import { Observable } from 'rxjs';
import { forEach } from '@angular/router/src/utils/collection';
import { ModalDirective } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-label',
  templateUrl: './label.component.html',
  styleUrls: ['./label.component.scss']
})
export class LabelComponent implements OnInit {

  task;
  closing: any[];
  closing$: Observable<any>;

  @ViewChild('konfirmasiModal') public konfirmasiModal: ModalDirective;

  constructor(private dataService: DataService) {
    this.task = this.dataService.getClosing('status', 'Dibayar').subscribe(res => {
      this.closing = res;
      console.log('Print: ' + res);
    });
  }

  ngOnInit() {
  }

  print() {
    window.print();
    this.konfirmasiModal.show();
  }
  selesai() {
    this.closing.forEach(data => {
      this.dataService.updateClosing(data.id, {status: 'Diprint', wktDiprint: this.dataService.getTimeNow()});
    });
    this.konfirmasiModal.hide();
  }

}
