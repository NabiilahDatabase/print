import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-mutasi',
  templateUrl: './mutasi.component.html',
  styleUrls: ['./mutasi.component.scss']
})
export class MutasiComponent implements OnInit {

  task;
  closing: Observable<any>;

  constructor(private dataService: DataService) {
    this.task = this.dataService.getClosing('Cek Mutasi').subscribe(res => {
      this.closing = res;
    });
  }

  ngOnInit() {
  }

}
