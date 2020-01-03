import { Injectable } from '@angular/core';
import { Orderan } from './data.service';

import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import * as moment from 'moment';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

const options = [
  {
    name: 'GOLDEN COCK',
    labelCode: '105',
    labelSize: '25x38 mm',
    widths: [ 104, 104, 104, 104, 104 ], // panjang tiap label + margin
    heights: [ 73, 73, 73, 73, 73 ], // tinggi tiap label + margin
    csFont: 12,
  },
  {
    name: 'BENG YU',
    labelCode: '105',
    labelSize: '24x37 mm',
    widths: [ 100, 100, 100, 100, 100 ], // panjang tiap label + margin
    heights: [ 66, 66, 66, 66, 66 ], // tinggi tiap label + margin
    csFont: 8,
  }
];
let labelOptions = options[0];

@Injectable({
  providedIn: 'root'
})
export class PdfService {

  constructor() {
    labelOptions = options[1];
  }

  generatePdf(data, pdfName?: string) {
    pdfMake.createPdf(data).download(pdfName);
  }

  // PRINT PDF LABEL
  printPDFLabel(orderan: Orderan[], printRumah?: boolean) {
    const orderanRumah = orderan.filter(data => data.toko === 'RUMAH');
    let orderanTmp = orderan.filter(data => data.toko !== 'RUMAH'); // exclude RUMAH
    if (printRumah) {
      orderanTmp = orderanTmp.concat(orderanRumah); // push RUMAH
      console.log(orderanTmp);
    }
    orderanTmp.map(x => ({ ...x, null: false }));
    const dataLabel = [];
    while (orderanTmp.length) { dataLabel.push(this.refillArray(orderanTmp.splice(0, 30), 30)); }
    const pdfRaw = {
      pageSize: 'A4',
      pageMargins: [ 3, 5, 1, 1 ],
      content: dataLabel.map((blockLabel) => (
        {
          layout: { defaultBorder: false },
          table: {
            widths: labelOptions.widths, // panjang tiap label
            heights: labelOptions.heights, // tinggi tiap label
            body: this.buatBlokLabel(blockLabel)
          },
          pageBreak: 'after'
        }
      ))
    };
    this.generatePdf(pdfRaw, `Label_Ambilan_${moment().format('YYYY-MM-DD')}`);
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
  refillArray(array: any[], lengthArray: number) {
    const newArray = array;
    if (array.length !== lengthArray) {
      let sisa = lengthArray - array.length;
      while (sisa !== 0) { newArray.push({ null: true }); sisa--; }
      return newArray;
    } else { return array; }
  }
  buatLabel(label) {
    if (!label.null) {
      if (label.toko !== 'RUMAH') {
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
            { text: label.cs, fontSize: labelOptions.csFont, bold: true, border: [ true, true, false, false ], alignment: 'center' }
          ]
        ];
      } else { // special label for RUMAH
        const data = label.barcode + '=' + label.cs + '=' + label.penerima.split(' ')[0];
        return [
          [
            { qr: data, rowSpan: 2, fit: '70' },
            {},
            { text: '  ' + label.cs, fontSize: 5, bold: true }
          ],
          [
            {},
            {},
            // tslint:disable-next-line: max-line-length
            { text: '  ' + label.barang + ' ' + label.warna + '\n\n  ' + label.penerima, fontSize: 5, border: [ false, true, false, false ] }
          ],
          [
            {},
            {},
            {}
          ]
        ];
      }
    } else {
      return [
        [ {}, {}, {} ],
        [ {}, {}, {} ],
        [ {}, {}, {} ]
      ];
    }
  }
  // PRINT PDF LABEL

  // PRINT PDF NOTA
  printPDFNota(orderan) {
    let orderanGroup = [];
    for (const key in orderan) { // reorder data {LTS: value[]} => [ {key: 'LTS', value: []}, ... ]
      if (orderan.hasOwnProperty(key)) {
        if (key !== 'RUMAH') { // filter data without RUMAH
          orderanGroup.push({key, value: orderan[key]});
        }
      }
    }
    const groupBlock = [];
    orderanGroup = orderanGroup.map(x => ({ ...x, null: false }));
    while (orderanGroup.length) { groupBlock.push(this.refillArray(orderanGroup.splice(0, 2), 2)); } // split menjadi 2 blok

    const newBlock = groupBlock.map(blokNota => (
      {
        pageBreak: 'after',
        style: 'tableExample',
        table: {
          widths: ['*', '*'],
          body: [
                  [
                    {
                    border: [false, false, false, false],
                      style: 'tableExample',
                      table: {
                        widths: [20, '*', 17, 60, 25],
                        body: this.buatNota(blokNota[0])
                      }
                    },
                    {
                    border: [false, false, false, false],
                      style: 'tableExample',
                      table: {
                        widths: [20, '*', 17, 60, 25],
                        body: this.buatNota(blokNota[1])
                      }
                    }
                  ]
                ]
        }
      }
    ));
    const pdfRaw = {
      pageSize: 'A4',
      pageOrientation: 'landscape',
      pageMargins: [ 10, 5, 10, 5 ],
      styles: {
        subheader: {
          fontSize: 12,
          bold: true,
          margin: [0, 0, 0, 0]
        },
        tableExample: {
          margin: [5, 5, 5, 5],
          fontSize: 10
        },
        tableHeader: {
          bold: true,
          fontSize: 10,
          color: 'black'
        }
      },
      content: newBlock
    };
    this.generatePdf(pdfRaw, `Nota_Ambilan_${moment().format('YYYY-MM-DD')}`);
  }
  buatNota(blokNota) {
    const nota = [];
    if (!blokNota.null) {
      const title = [
        {text: blokNota.key, style: 'subheader', colSpan: '5', alignment: 'center'},
        {}, {}, {}, {},
      ];
      const header = [
        {text: 'NO', style: 'tableHeader', fillColor: '#dddddd'},
        {text: 'BARANG', style: 'tableHeader', fillColor: '#dddddd'},
        {text: 'CS', style: 'tableHeader', fillColor: '#dddddd'},
        {text: 'HARGA', style: 'tableHeader', fillColor: '#dddddd'},
        {text: 'CEK', style: 'tableHeader', fillColor: '#dddddd'},
      ];
      nota.push(title);
      nota.push(header);
      blokNota.value.forEach((item, i) => {
        const list = [
          {text: i + 1, alignment: 'center'},
          item.barang + ' ' + item.warna,
          {text: item.cs, alignment: 'center'},
              '', '',
        ];
        nota.push(list);
      });
      nota.push([
        {text: 'SUBTOTAL', style: 'tableHeader', colSpan: '3', alignment: 'right', fillColor: '#dddddd'},
        {}, {}, {text: '', colSpan: '2', fillColor: '#dddddd'}, {},
      ]);
      nota.push([
        {text: 'DISKON', style: 'tableHeader', colSpan: '3', alignment: 'right', fillColor: '#dddddd'},
        {}, {}, {text: '', colSpan: '2'}, {},
      ]);
      nota.push([
        {text: 'TOTAL', style: 'tableHeader', colSpan: '3', alignment: 'right', fillColor: '#dddddd'},
        {}, {}, {text: '', colSpan: '2', fillColor: '#dddddd'}, {},
      ]);
    } else {
      nota.push([]);
    }
    return nota;
  }
  // PRINT PDF NOTA

}
