import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { LogSystemService } from '../../services/logSystem.service';
@Component({
  selector: 'app-a-test-qtht',
  templateUrl: './a-test-qtht.component.html',
  styleUrls: ['./a-test-qtht.component.css']
})
export class ATestQthtComponent implements OnInit {

  public logStudyprocess;
  public qTHTColumn: string[] = ['index', 'date', 'personnelName', 'className', 'content', 'mumberSessions'];
  public qTHTdataSource = new MatTableDataSource(this.logStudyprocess);
  constructor(
    public logSystemService: LogSystemService
  ) { }

  ngOnInit() {
    // tìm cardId theo id
    // gọi hàm logQTHT theo id
  }

   // chi tiết log QTHT
   public getLogQTHT(id) {
    this.logSystemService.logStudyProcessbyLearnerId(id).subscribe((result: any) => {
      this.logStudyprocess = result;
      this.loadtableLogQTHT(result);
    }, error => {
    });
  }
  public loadtableLogQTHT(data3: any) {
    this.qTHTdataSource = new MatTableDataSource(data3);
  }
}
