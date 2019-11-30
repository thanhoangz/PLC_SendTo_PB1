import { Component, OnInit } from '@angular/core';
import { LearnerService } from '../../services/learner.service';
@Component({
  selector: 'app-a-test-diem',
  templateUrl: './a-test-diem.component.html',
  styleUrls: ['./a-test-diem.component.css']
})
export class ATestDiemComponent implements OnInit {

  public Diem;
    // tslint:disable-next-line: max-line-length
    public displayedColumnsDiemDinhKi: string[] = ['index', 'week', 'point', 'averagePoint', 'sortedByPoint', 'sortedByAveragePoint'];
  constructor(
    private learnerService: LearnerService,
  ) { }

  ngOnInit() {
    //  cardId => Id
    // gọi thông tin điểm theo lớp đã học theo Id
    // this.getDiemTheoLopDaHoc(result.id);
  }

    // Điểm theo lớp đã học
    public getDiemTheoLopDaHoc(id) {
      this.learnerService.getDiem(id).subscribe((result4: any) => {
        this.Diem = result4;
      }, error => {
      });
    }
}
