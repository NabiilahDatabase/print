import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class PopupService {

  constructor(
    private snackBar: MatSnackBar
    ) { }

  showToast(message: string, action) {
    this.snackBar.open(message, action, {
      duration: 4000,
    });
  }
}
