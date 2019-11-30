import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
import { LichhenService } from '../../services/lichhen.service';
@Component({
  selector: 'app-hentuvan',
  templateUrl: './hentuvan.component.html',
  styleUrls: ['./hentuvan.component.css']
})
export class HentuvanComponent implements OnInit {

  public pageSizeOptions = [10, 15, 20];
  public hentuvan;
  public displayedColumns: string[] = ['index', 'ngaytao', 'hoten', 'sdt', 'email', 'phuhuynh', 'Sdtphuhuynh', 'ghichu'];
  public dataSource = new MatTableDataSource(this.hentuvan);
  public selection = new SelectionModel(true, []);

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  constructor(
    private lichhenService: LichhenService
  ) { }

  ngOnInit() {
    this.Henlich();
    this.paginator._intl.itemsPerPageLabel = 'Kích thước trang';
  }

  public Henlich() {
    this.lichhenService.getAll().subscribe(result => {
      this.hentuvan = result;
      this.loadTables(result);
    }, error => {
    });
  }

  public loadTables(data: any) {
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.paginator = this.paginator;
  }

}
