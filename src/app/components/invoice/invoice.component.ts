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
  closing: Observable<any>;

  constructor(private dataService: DataService) {
    this.task = this.dataService.getClosing(null).subscribe(res => {
      this.closing = res;
      console.log(res);
    });
  }

  ngOnInit() {
  }

}
