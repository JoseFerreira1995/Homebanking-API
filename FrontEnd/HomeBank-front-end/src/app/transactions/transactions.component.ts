import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { AuthService } from '../services/auth.service';

import { DepositDialogComponent } from '../depositDialog/depositDialog.component';
import { WithdrawDialogComponent } from '../withdraw-dialog/withdraw-dialog.component';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css'],
})
export class TransactionsComponent implements OnInit {
  balance!: number;
  transactions: any[] = [];

  constructor(
    private apiService: ApiService,
    private authService: AuthService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.apiService.getBalance(this.authService.getToken()).subscribe({
      next: (response) => {
        this.balance = response.balance;
      },
      error: (err) => {
        console.log('Failed to get balance', err);
      },
    });
    this.apiService.getTransactions().subscribe({
      next: (response) => {
        this.transactions = response.transactions;
      },
      error: (err) => {
        console.log('Failed to get transactions', err);
      },
    });
  }

  addMoney(): void {
    const dialog = this.dialog.open(DepositDialogComponent, {
      width: '300px',
    });

    dialog.afterClosed().subscribe((result) => {
      if (result) {
        this.apiService.deposit(result).subscribe((data) => {
          this.balance = data.balance;
          window.location.reload();
        });
      }
    });
  }

  withdrawMoney() {
    const dialog = this.dialog.open(WithdrawDialogComponent, {
      width: '300px',
    });
    dialog.afterClosed().subscribe((result) => {
      if (result) {
        this.apiService.withdraw(result).subscribe((data) => {
          this.balance = data.balance;
          window.location.reload();
        });
      }
    });
  }
}
