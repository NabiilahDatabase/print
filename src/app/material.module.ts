import { NgModule } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatListModule } from '@angular/material/list';
import { MatPaginatorModule } from '@angular/material';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatChipsModule } from '@angular/material/chips';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
  imports: [
    MatTableModule,
    MatGridListModule,
    MatListModule,
    MatPaginatorModule,
    MatSnackBarModule,
    MatChipsModule,
    MatTooltipModule,
  ],
  exports: [
    MatTableModule,
    MatGridListModule,
    MatListModule,
    MatPaginatorModule,
    MatSnackBarModule,
    MatChipsModule,
    MatTooltipModule,
  ]
})

export class MaterialModule {}
