import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.scss']
})
export class InvoiceComponent implements OnInit {

  task;
  closing;
  id: string;

  constructor(private dataService: DataService) {
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

}
