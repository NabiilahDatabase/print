import { Injectable } from '@angular/core';

import { map, switchMap } from 'rxjs/operators';
import * as moment from 'moment';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable, BehaviorSubject, combineLatest } from 'rxjs';
import firebase from 'firebase';

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

export interface Orderan {
  id: string;
  barang: string;
  barcode: string;
  cs: string;
  date: string;
  hargaBeli: number;
  penerima: string;
  pj: string;
  status: string;
  toko: string;
  warna: string;
}

export interface Stock {
  id: string;
  booked: boolean;
  hargabeli: number;
  hargajual: number;
  image: string;
  nama: string;
  printed: boolean;
  ready: boolean;
  statusbarang: string;
  toko: string;
  warna: string;
}

@Injectable({
  providedIn: 'root'
})
export class DataService {

  closing$: Observable<any>;
  mutasiFilter$: BehaviorSubject<string|null>;

  orderan$: Observable<any>;
  filterOrderanTgl$: BehaviorSubject<string|null>;

  stock$: Observable<any>;
  readyFilter$: BehaviorSubject<boolean|null>;
  printedFilter$: BehaviorSubject<boolean|null>;

  tahun = new Date().getFullYear().toString();
  bulan = ('0' + (new Date().getMonth() + 1)).slice(-2);
  hari = ('0' + (new Date().getDate())).slice(-2);

  constructor(public db: AngularFirestore) {
    this.mutasiFilter$ = new BehaviorSubject(null);
    this.filterOrderanTgl$ = new BehaviorSubject(null);
    /*
    this.closing$ = db.collection('closing').snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          const date = moment.unix(parseInt(id.split('-')[0], 10) / 1000).format('YYYY-MM-DD');
          return { id, date, ...data };
        });
      })
    ); */
  }

  getClosing(field: string, stat: string | null) {
    this.mutasiFilter$.next(stat);
    this.closing$ = combineLatest([
      this.mutasiFilter$
      ]).pipe(
      switchMap(([status]) =>
        this.db.collection('closing', ref => {
          let query: firebase.firestore.CollectionReference | firebase.firestore.Query = ref;
          if (status) { query = query.where(field, '==', status); }
          return query;
        }).snapshotChanges().pipe(
          map(actions => {
            return actions.map(a => {
              const data = a.payload.doc.data() as Closing[];
              const id = a.payload.doc.id;
              const date = moment.unix(parseInt(id.split('-')[0], 10) / 1000).format('YYYYMMDD');
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

  getOrderan(YYYYMMDD: string) {
    this.filterOrderanTgl$.next(YYYYMMDD);
    this.orderan$ = combineLatest([
      this.filterOrderanTgl$
      ]).pipe(
      switchMap(([tgl]) =>
        this.db.collection('orderan', ref => {
          let query: firebase.firestore.CollectionReference | firebase.firestore.Query = ref;
          if (tgl) { query = query.where('date', '==', tgl); }
          return query;
        }).snapshotChanges().pipe(
          map(actions => {
            return actions.map(a => {
              const data = a.payload.doc.data() as Orderan[];
              const id = a.payload.doc.id;
              return { id, ...data };
            });
          })
        )
      )
    );
    return this.orderan$;
  }
  deleteOrderan(id: string) {
    this.db.collection('orderan').doc(id).delete();
  }

  getStockGudang($ready?: boolean|null, $printed?: boolean|null) {
    this.readyFilter$ = new BehaviorSubject($ready);
    this.printedFilter$ = new BehaviorSubject($printed);
    // tslint:disable-next-line: deprecation
    this.stock$ = combineLatest(
      this.readyFilter$,
      this.printedFilter$
    ).pipe(
      switchMap(([ready, printed]) =>
        this.db.collection('gudang', ref => {
          let query: firebase.firestore.CollectionReference | firebase.firestore.Query = ref;
          if (ready !== null) { query = query.where('ready', '==', ready); }
          if (printed !== null) { query = query.where('printed', '==', printed); }
          return query;
        }).snapshotChanges().pipe(
          map(actions => {
            return actions.map(a => {
              const data = a.payload.doc.data() as Stock[];
              const id = a.payload.doc.id;
              return { id, ...data };
            });
          })
        )
      )
    );
  }
  filterStockReady(ready: boolean|null) {
    this.readyFilter$.next(ready);
  }
  filterStockPrinted(printed: boolean|null) {
    this.printedFilter$.next(printed);
  }
  async updateStockToko(stock: Stock) {
    return this.db.collection('gudang').doc(stock.id).update({toko: stock.toko.toUpperCase().trim()});
  }
  async updateStockDiprint(stocks: Stock[]) {
    const batch = this.db.firestore.batch();
    stocks.forEach(stock => {
      const docRef = this.db.collection('gudang').doc(stock.id).ref;
      batch.update(docRef, {printed: true});
    });
    return batch.commit();
  }

  getAmbilanRange(unixStart: number, unixEnd: number) {
    return this.db.collection<Orderan>('orderan', ref =>
        ref.orderBy('wktScan').startAt(unixStart).endAt(unixEnd).where('status', '==', 'diambil')
      ).snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as Orderan;
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  }

  getTimeNow() {
    return moment().toDate().getTime();
  }
}
