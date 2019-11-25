import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-timesheet-dialog',
  templateUrl: './confirm-timesheet-dialog.component.html',
  styleUrls: ['./confirm-timesheet-dialog.component.css']
})
export class ConfirmTimesheetDialogComponent implements OnInit {

  message = '';
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<ConfirmTimesheetDialogComponent>,
  ) {
    this.message = this.data.message;
  }

  ngOnInit() {
  }

  sendResult() {
    this.dialogRef.close(true);
  }

}
