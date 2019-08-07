import { Injectable } from '@angular/core';

import { map, switchMap } from 'rxjs/operators';
import * as moment from 'moment';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable, BehaviorSubject, combineLatest } from 'rxjs';

export interface Closing {
  id: string;
  date: string;
  penerima: string;
  nPenerima: string;
  alamat: string;
  pengirim: string;
  nPengirim: string;
  cs: string;
  ekspedisi: string;
  service: string;
  berat: number;
  ongkir: number;
  diskon: number;
  status: string;
  switch: boolean;
}
@Injectable({
  providedIn: 'root'
})
export class DataService {

  closing$: Observable<any>;
  mutasiFilter$: BehaviorSubject<string|null>;

  constructor(public db: AngularFirestore) {
    this.mutasiFilter$ = new BehaviorSubject(null);
    this.closing$ = db.collection('closing').snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          const date = moment.unix(parseInt(id.split('-')[0], 10) / 1000).format('YYYY-MM-DD');
          return { id, date, ...data };
        });
      })
    );
  }

  getClosing(stat: string | null) {
    this.mutasiFilter$.next(stat);
    this.closing$ = combineLatest([
      this.mutasiFilter$
      ]).pipe(
      switchMap(([status]) =>
        this.db.collection('closing', ref => {
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
    return this.closing$;
  }

  getClosingan(iid: string) {
    return this.db.collection('closing').doc(iid).valueChanges();
  }

  updateClosing(id: string, data) {
    this.db.collection('closing').doc(id).update(data);
  }

  deleteClosing(id: string) {
    this.db.collection('closing').doc(id).delete();
  }

  getTimeNow() {
    return moment().toDate().getTime();
  }
}
