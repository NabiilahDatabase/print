import { Injectable } from '@angular/core';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class ToolService {

  constructor() { }

  titleCase(str) {
    if (str) {
      return str.toLowerCase().split(' ').map((word) => {
        if (word[0]) {
          return word.replace(word[0], word[0].toUpperCase());
        } else { return ''; }
      }).join(' ');
    } else { return ''; }
  }
  getTime(format?: string) {
    if (format) {
      return moment(moment().toDate().getTime()).format(format);
    } else {
      return Math.round(new Date().getTime() / 1000);
    }
  }
  generateNumber(x: number)  {
    const a = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    let n; const r = [];
    for (n = 1; n <= x; n++) {
       const i = Math.floor((Math.random() * (9 - n)) + 1);
       r.push(a[i]);
       a[i] = a[9 - n];
    }
    let uid = '';
    for (let j = 0; j < x; j++) {
       uid += r[j] + '';
    }
    return uid;
  }

}
