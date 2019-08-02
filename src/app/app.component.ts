import { Component } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable, BehaviorSubject, combineLatest } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import * as moment from 'moment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'print';

  closing: any[];
  closing$: Observable<any>;
  mutasiFilter$: BehaviorSubject<string|null>;

  constructor(db: AngularFirestore) {

    this.closing$ = db.collection('closing').valueChanges();

    this.closing$.subscribe(res => {
      this.closing = res;
      console.log(res);
    });
  }

}
