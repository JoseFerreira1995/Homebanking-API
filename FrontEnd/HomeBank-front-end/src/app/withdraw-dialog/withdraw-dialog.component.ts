import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-withdraw-dialog',
  templateUrl: './withdraw-dialog.component.html',
  styleUrls: ['./withdraw-dialog.component.css']
})
export class WithdrawDialogComponent {

  amount: number = 0;

  constructor(public dialogRef: MatDialogRef<WithdrawDialogComponent>) {}

  onNoClick(){
    this.dialogRef.close();
  }

}
