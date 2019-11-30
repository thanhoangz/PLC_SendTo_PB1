import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ReceiptDetailService } from 'src/app/admin/services/Receipt-Detail.service';
import { ReceiptsService } from '../../services/receipts.service';
@Component({
  selector: 'app-a-test-lsdt',
  templateUrl: './a-test-lsdt.component.html',
  styleUrls: ['./a-test-lsdt.component.css']
})
export class ATestLsdtComponent implements OnInit {

  public receiptDetails;
  public receipts;
  // tslint:disable-next-line: max-line-length
  public displayedColumnsReceiptsDetail: string[] = ['index', 'languageClassName', 'month', 'tuition', 'fundMoney', 'infrastructureMoney', 'otherMoney', 'totalMoney'];
  // tslint:disable-next-line: member-ordering
  public dataSourceReceiptsDetail = new MatTableDataSource(this.receiptDetails);
  constructor(
    public receiptDetailService: ReceiptDetailService,
    private receiptsService: ReceiptsService,
  ) { }

  ngOnInit() {
   // cardId => Id
    // gọi thông tin phiếu thu theo id
  //  this.getReceiptsByLearnerId(result.id);
  }

  // quá trình đóng họ
  public getReceiptsByLearnerId(id) {
    this.receiptsService.getReceiptsByLearnerId(id).subscribe((result2: any) => {
      this.receipts = result2;
    }, error => {
    });
  }

  // chi tiết đóng họ
  public getReceiptDetailsByReceiptId(id) {
    this.receiptDetailService.getReceiptsDetailById(id).subscribe((result: any) => {
      this.receiptDetails = result;
      this.loadTablesReceiptsDetail(result);
    }, error => {
    });
  }
  public loadTablesReceiptsDetail(data3: any) {
    this.dataSourceReceiptsDetail = new MatTableDataSource(data3);
  }
}
