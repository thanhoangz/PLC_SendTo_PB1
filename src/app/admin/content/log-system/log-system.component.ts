import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { NotificationService } from '../../services/extension/notification.service';
import { ConfirmService } from '../../services/extension/confirm.service';
import { LoginService } from '../../services/login.service';
import { LogSystemsService } from '../../services/log-systems.service';
import { UserService } from '../../services/user.service';
import { FomatDateService } from '../../services/extension/FomatDate.service';

@Component({
  selector: 'app-log-system',
  templateUrl: './log-system.component.html',
  styleUrls: ['./log-system.component.css']
})
export class LogSystemComponent implements OnInit {
  public showProgressBar = true;

  public screenHeight: any;
  public screenWidth: any;
  public pageSizeOptions = [10, 15, 20];


  public logSystems;
  public users;
  public userSelected;

  public toDate;
  public fromDate;
  public displayedColumns: string[] = ['index', 'username', 'datetime', 'content'];
  public dataSource = new MatTableDataSource(this.logSystems);
  public selection = new SelectionModel(true, []);

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private logSystemsService: LogSystemsService,
    private userService: UserService,
    public matDialog: MatDialog,
    private notificationService: NotificationService,
    private confirmService: ConfirmService,
    private loginService: LoginService,
    private fomatDateService: FomatDateService
  ) {
    this.screenWidth = (window.screen.width);
    this.screenHeight = (window.screen.height);
    this.loginService.islogged();

  }

  public loadTables(data: any) {
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.paginator = this.paginator;
  }
  ngOnInit() {
    this.paginator._intl.itemsPerPageLabel = 'Kích thước trang';
    this.getLogSystems();
    this.getAllUsers();

  }

  public getLogSystems() {
    this.userSelected = null;
    this.toDate = null;
    this.fromDate = null;
    this.startProgressBar();
    this.logSystemsService.getAllLogSystem().subscribe(result => {
      this.logSystems = result;
      this.loadTables(result);
      console.log(result);
      this.stopProgressBar();
    }, error => {
      this.stopProgressBar();
    });
  }
  public getAllUsers() {
    this.userService.getAllUser().subscribe(result => {
      this.users = result;
      console.log(result);
    }, error => {
    });
  }
  public SearchLogSystem() {
    // tslint:disable-next-line: curly
    if (this.userSelected != null && this.toDate != null && this.fromDate != null) {
      this.toDate = this.fomatDateService.transformDate(this.toDate);
      this.fromDate = this.fomatDateService.transformDate(this.fromDate);
      this.startProgressBar();
      this.logSystemsService.SearchLog(this.userSelected, this.toDate, this.fromDate).subscribe(result => {
        this.logSystems = result;
        this.loadTables(result);
        console.log(result);

        this.stopProgressBar();

      }, error => {
        this.stopProgressBar();

      });
    }
    // tslint:disable-next-line: one-line
    else {
      this.notificationService.showNotification(2, 'Hệ thống', 'Mời nhập đủ thông tin!');
    }

  }



  public startProgressBar() {
    this.showProgressBar = true;
  }
  public stopProgressBar() {
    this.showProgressBar = false;
  }


}
