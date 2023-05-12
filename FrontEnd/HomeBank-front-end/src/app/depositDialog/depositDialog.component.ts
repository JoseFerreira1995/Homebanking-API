import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-depositDialog',
  templateUrl: './depositDialog.component.html',
  styleUrls: ['././depositDialog.component.css']
})
export class DepositDialogComponent {

  amount: number = 0;

  constructor(private dialogService: MatDialogRef<DepositDialogComponent>) {}

  onNoClick(): void {
    this.dialogService.close
  }
}
