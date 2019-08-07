import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { Observable } from 'rxjs';
import { PopupService } from 'src/app/services/popup.service';

@Component({
  selector: 'app-analitik',
  templateUrl: './analitik.component.html',
  styleUrls: ['./analitik.component.scss']
})
export class AnalitikComponent implements OnInit {

  task;
  displayedColumns: string[] = ['id', 'cs', 'penerima', 'jumlah', 'total', 'status'];
  closing: Observable<any>;

  constructor(
    private dataService: DataService,
    private popup: PopupService,
    ) {
    this.task = this.dataService.getClosing(null).subscribe(res => {
      this.closing = res;
    });
  }

  ngOnInit() {
  }

}
