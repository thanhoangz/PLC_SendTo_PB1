import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSelectionList } from '@angular/material/list';
import { ConstService } from '../../services/extension/Const.service';
import { LearnerService } from '../../services/learner.service';
import { LanguageClassesService } from '../../services/language-classes.service';
import { AttendanceSheetDetailService } from '../../services/attendance-sheet-detail.service';
import { AttendanceSheetService } from '../../services/attendance-sheet.service';
import { MatDialog } from '@angular/material/dialog';
import { NotificationService } from '../../services/extension/notification.service';
import { ConfirmService } from '../../services/extension/confirm.service';
import { LoginService } from '../../services/login.service';
import { DatePipe } from '@angular/common';
// tslint:disable-next-line: max-line-length
import { AddOutAttendanceComponent } from '../attendance-sheet/dialog/add-attendance-dialog/add-out-attendance/add-out-attendance.component';
import { AddAttendanceDialogComponent } from '../attendance-sheet/dialog/add-attendance-dialog/add-attendance-dialog.component';
// tslint:disable-next-line: max-line-length
import { AddListAttendanceByMonthComponent } from '../attendance-sheet/dialog/add-attendance-dialog/add-list-attendance-by-month/add-list-attendance-by-month.component';

@Component({
  selector: 'app-attendance-sheet-ver2',
  templateUrl: './attendance-sheet-ver2.component.html',
  styleUrls: ['./attendance-sheet-ver2.component.css']
})
export class AttendanceSheetVer2Component implements OnInit {

  showProgressBar = false;
  month;
  year;
  years = [2015, 2016, 2017, 2018, 2019, 2020, 2021];
  public permissionOfFunction = {
    canCreate: false,
    canUpdate: false,
    canDelete: false,
    canRead: false
  };

  public fullLearnerForMonth;

  public countLesson = 0;
  public months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  @ViewChild('learners', { static: true, read: MatSelectionList }) learners: MatSelectionList;
  public floatLabel = 'always';
  public isOpenDialog = false;
  public iconMale = '../../../../assets/admin/dist/img/gender/boy.png';
  public iconFemale = '../../../../assets/admin/dist/img/gender/girl.png';
  public currentClassId;
  public currentDate = new Date();

  public classes;

  public learnersSource;

  public inforClass = {
    maleNumber: 0,
    femaleNumber: 0,
    totalNumber: 0
  };

  public numberAttendance = 0;
  public numberNotAttendace = 0;

  public checkedLearners = [];
  public notCheckedLearners = [];
  public checkedAll = false;

  public statusOfCurrentAttendance = 'Chưa có phiếu điểm danh';
  public currentAttendance;
  public attendanceSheetDetails = [];
  constructor(
    public learnerService: LearnerService,
    public languageClassesService: LanguageClassesService,
    public attendanceSheetDetailService: AttendanceSheetDetailService,
    public attendanceSheetService: AttendanceSheetService,

    public matDialog: MatDialog,
    private notificationService: NotificationService,
    private confirmService: ConfirmService,
    private loginService: LoginService,
    public datepipe: DatePipe,
  ) {
    this.loginService.islogged();
    setTimeout(() => {
      this.openPermissionOfFuncition();
    }, 1500);
  }

  ngOnInit() {
    this.getAllClasses();
    this.month = new Date().getMonth();
    this.year = new Date().getFullYear();

  }

  public createAttendanceDialog() {
    if (!this.isOpenDialog) {
      this.isOpenDialog = true;
      const dialogRef = this.matDialog.open(AddListAttendanceByMonthComponent, {
        width: `50vh`,
        data: {
          _user: ConstService.user,
          month: this.month,
          year: this.year
        },
      }).afterClosed().subscribe(result => {
        this.isOpenDialog = false;
        if (result) {
          this.getAllClasses();
        }

      });
    }
  }


  public changeYear(year) {
    this.year = year;
    this.getTableAttendanceForMonth(this.month, year, this.currentClassId);
  }


  public changeClass(classId) {
    this.currentClassId = classId;
    this.getTableAttendanceForMonth(this.month, this.year, classId);
  }

  public getAllLearnerInClass(classId) {
    this.learnerService.getFullLearningByClass(classId).subscribe((result: any[]) => {
      this.learnersSource = result;
      this.getInfoClass(result);
    }, error => {

    });

  }

  public getAllClasses() {
    this.languageClassesService.getAllLanguageClasses().subscribe(result => {
      this.classes = result;
      this.currentClassId = result[0].id;
      this.getTableAttendanceForMonth(this.month, this.year, this.currentClassId);
    }, error => {

    });
  }

  public getInfoClass(learners: any[]) {
    this.inforClass = {
      maleNumber: 0,
      femaleNumber: 0,
      totalNumber: 0
    };
    this.inforClass.totalNumber = learners.length;
    learners.forEach(element => {
      if (element.sex === true) {
        this.inforClass.maleNumber++;
      } else {
        this.inforClass.femaleNumber++;
      }
    });
  }


  public getTableAttendanceForMonth(month, year, classId) {
    console.log(classId);
    this.attendanceSheetService.getAttendanceSheetForMonth(month + 1, year, classId).subscribe((result: any) => {
      this.fullLearnerForMonth = result;
      this.countLesson = result[0].days;
      console.log(result);
    }, error => {

    });
  }

  public getYear(date: Date) {
    return date.getFullYear();
  }



  /* Get chi tiết điểm danh theo bảng điểm danh */
  public getAllAttendanceDetails(attendanceId) {
    this.attendanceSheetDetailService.getAttendanceDetailsByAttendance(attendanceId).subscribe((result: any[]) => {
      this.attendanceSheetDetails = result;
      this.numberAttendance = result.length;
      this.getAllLearnerInClass(this.currentClassId);
    }, error => {
    });
  }

  public isChecked(learnerId) {
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < this.attendanceSheetDetails.length; i++) {
      if (learnerId === this.attendanceSheetDetails[i].learnerId) {
        return true;
      }
    }
    return false;
  }


  public resetAll() {
    this.learnersSource = [];
    this.numberAttendance = 0;
    this.numberNotAttendace = 0;
    this.inforClass = {
      maleNumber: 0,
      femaleNumber: 0,
      totalNumber: 0
    };
    this.checkedAll = false;
    this.statusOfCurrentAttendance = 'Chưa có phiếu điểm danh';
    this.currentAttendance = null;
    this.attendanceSheetDetails = [];
  }

  /* Điểm danh ké cho học viên lớp khác */
  public rollCallOutClass() {
    if (!this.isOpenDialog) {
      this.isOpenDialog = true;
      const dialogRef = this.matDialog.open(AddOutAttendanceComponent, {
        width: `50vh`,
        data: {
          classSelected: this.currentClassId,
          dateSelected: this.currentDate,
        },
      }).afterClosed().subscribe(result => {
        this.isOpenDialog = false;
        if (result) {
          this.getAllClasses();
        }

      });
    }
  }


  public openPermissionOfFuncition() {

    if (ConstService.user.userName === 'admin') {
      this.permissionOfFunction.canCreate = true;
      this.permissionOfFunction.canDelete = true;
      this.permissionOfFunction.canRead = true;
      this.permissionOfFunction.canUpdate = true;
      return;
    }

    const temp = ConstService.permissions.filter(y => y.functionName === 'Điểm danh')[0];
    this.permissionOfFunction.canCreate = temp.canCreate;
    this.permissionOfFunction.canDelete = temp.canDelete;
    this.permissionOfFunction.canRead = temp.canRead;
    this.permissionOfFunction.canUpdate = temp.canUpdate;

  }

  changeMonth(month) {
    this.month = month;
    this.getTableAttendanceForMonth(month, this.year, this.currentClassId);
  }

  setNameOfMonth(numberMonth) {
    return 'Tháng ' + numberMonth;
  }

  onChange(timesheet) {
    // this.timeSheetService.putTimeSheet(timesheet).subscribe(result => {

    //   this.logSystemService.postLogSystem({
    //     content: `${ConstService.user.userName} đã cập nhật chấm công của tháng ${this.monthSelected} cho ${timesheet.personnelName}`,
    //     userId: ConstService.user.id,
    //     isTimeSheetLog: true,
    //     isSalaryPayLog: false,
    //     isStudyProcessLog: false,
    //     isManagerPointLog: false
    //   }).subscribe(dataResult => {

    //   }, error => { });

    //   this.getTimeSheet();
    // }, error => {
    // });
  }
}
