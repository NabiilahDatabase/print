import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { DataService } from '../../services/data.service';
import { Observable } from 'rxjs';
import { forEach } from '@angular/router/src/utils/collection';

@Component({
  selector: 'app-label',
  templateUrl: './label.component.html',
  styleUrls: ['./label.component.scss']
})
export class LabelComponent implements OnInit {

  task;
  closing: any[];
  closing$: Observable<any>;

  constructor(private dataService: DataService) {
    this.task = this.dataService.getClosing('Dibayar').subscribe(res => {
      this.closing = res;
    });
  }

  ngOnInit() {
  }

  print() {
    window.print();
    this.closing.forEach(data => {
      this.dataService.updateClosing(data.id, {status: 'Diprint'});
    });
  }

  onDestroy() {
    this.task.unsubscribe();
  }

}
