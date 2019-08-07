import { Component, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ZXingScannerComponent } from '@zxing/ngx-scanner';

@Component({
  selector: 'app-scanner',
  templateUrl: './scanner.component.html',
  styleUrls: ['./scanner.component.scss']
})
export class ScannerComponent {

  @ViewChild('scanner')
  scanner: ZXingScannerComponent;

  constructor(
    public dialogRef: MatDialogRef<ScannerComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
    ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  barcode(hasil: string) {
    this.data.code = hasil;
  }

}
