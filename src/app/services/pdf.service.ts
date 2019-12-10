import { Injectable } from '@angular/core';
import { Orderan } from './data.service';

import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import * as moment from 'moment';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Injectable({
  providedIn: 'root'
})
export class PdfService {

  constructor() {
  }

  generatePdf(data, pdfName?: string) {
    pdfMake.createPdf(data).download(pdfName);
  }

  printPDFLabel(orderan: Orderan[]) {
    const orderanTmp = orderan.map(x => ({ ...x, null: false }));
    const dataLabel = [];
    while (orderanTmp.length) { dataLabel.push(this.refillArray(orderanTmp.splice(0, 30))); }
    const pdfRaw = {
      pageSize: 'A4',
      pageMargins: [ 3, 5, 1, 1 ],
      content: dataLabel.map((blockLabel) => (
        {
          layout: { defaultBorder: false },
          table: {
            widths: [ 104, 104, 104, 104, 104 ], // panjang tiap label
            heights: [ 73, 73, 73, 73, 73 ], // tinggi tiap label
            body: this.buatBlokLabel(blockLabel)
          },
          pageBreak: 'after'
        }
      ))
    };
    this.generatePdf(pdfRaw, `Label_Ambilan_${moment(moment().toDate().getTime()).format('YYYY-MM-DD')}`);
  }
  buatBlokLabel(blockData) {
    const newArr = [];
    while (blockData.length) { newArr.push(blockData.splice(0, 5)); }
    const block = newArr.map((labelBlock: any[]) => {
      return labelBlock.map(label => ({
        margin: [0, 0, 0, 0],
        layout: { defaultBorder: false },
        table: {
          widths: [40, 'auto', 'auto'],
          body: this.buatLabel(label)
        }
      }));
    });
    return block;
  }
  refillArray(array: any[]) {
    const newArray = array;
    if (array.length !== 30) {
      let sisa = 30 - array.length;
      while (sisa !== 0) { newArray.push({ null: true }); sisa--; }
      return newArray;
    } else { return array; }
  }
  buatLabel(label) {
    if (!label.null) {
      return [
        [
          { qr: label.barcode, rowSpan: 2, fit: '50' },
          { text: label.toko, colSpan: 2, fontSize: 7 },
          {}
        ],
        [{}, { text: label.barang + ' ' + label.warna, colSpan: 2, fontSize: 7, border: [ false, true, false, false ] }, {}],
        [
          { text: label.penerima, colSpan: 2, fontSize: 5, bold: true },
          {},
          { text: label.cs, fontSize: 12, bold: true, border: [ true, true, false, false ], alignment: 'center' }
        ]
      ];
    } else {
      return [
        [ {}, {}, {} ],
        [ {}, {}, {} ],
        [ {}, {}, {} ]
      ];
    }
  }

}
