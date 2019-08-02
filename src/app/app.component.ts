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
  closing$: Observable<any>;
  mutasiFilter$: BehaviorSubject<string|null>;

  constructor(db: AngularFirestore) {


    this.closing$ = combineLatest([
      this.mutasiFilter$
      ]).pipe(
      switchMap(([status]) =>
        db.collection('closing', ref => {
          let query: firebase.firestore.CollectionReference | firebase.firestore.Query = ref;
          if (status) { query = query.where('status', '==', status); }
          return query;
        }).snapshotChanges().pipe(
          map(actions => {
            return actions.map(a => {
              const data = a.payload.doc.data();
              const id = a.payload.doc.id;
              const date = moment.unix(parseInt(id.split('-')[0], 10) / 1000).format('YYYY-MM-DD');
              return { id, date, ...data };
            });
          })
        )
      )
      );
  }

}
