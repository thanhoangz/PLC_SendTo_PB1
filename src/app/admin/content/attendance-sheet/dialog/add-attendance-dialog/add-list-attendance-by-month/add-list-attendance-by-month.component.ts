import { Component, OnInit, Inject } from '@angular/core';
import { ConstService } from 'src/app/admin/services/extension/Const.service';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { LanguageClassesService } from 'src/app/admin/services/language-classes.service';
import { NotificationService } from 'src/app/admin/services/extension/notification.service';
import { CourseService } from 'src/app/admin/services/course.service';
import { LearnerService } from 'src/app/admin/services/learner.service';
import { AttendanceSheetService } from 'src/app/admin/services/attendance-sheet.service';
import { LecturersService } from 'src/app/admin/services/lecturers.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-add-list-attendance-by-month',
  templateUrl: './add-list-attendance-by-month.component.html',
  styleUrls: ['./add-list-attendance-by-month.component.css']
})
export class AddListAttendanceByMonthComponent implements OnInit {


  public classes;
  public lecturers;
  public tutors;
  public user;

  public lecturerId;
  public tutorId;
  public classId;
  public month;
  public year;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<AddListAttendanceByMonthComponent>,
    private languageClassesService: LanguageClassesService,
    public dialog: MatDialog,
    private notificationService: NotificationService,
    private courseService: CourseService,
    public learnerService: LearnerService,
    public attendanceSheetService: AttendanceSheetService,
    public lecturersService: LecturersService,
    public datepipe: DatePipe
  ) {
    this.user = this.data._user;
    this.month = this.data.month;
    this.year = this.data.year;
  }

  ngOnInit() {
    this.getAllClasses();
    this.getAllLecturers();
    this.getAllTutor();
  }


  public createAttendance() {
    // tslint:disable-next-line: max-line-length
    console.log(this.user.id);
    console.log(this.lecturerId);
    console.log(this.tutorId);
    console.log(this.classId);
    // tslint:disable-next-line: max-line-length
    this.attendanceSheetService.postAttendanceList(this.user.id, this.lecturerId, this.tutorId, this.classId, this.month + 1, this.year).subscribe(result => {
      setTimeout(() => { this.notificationService.showNotification(1, '', 'Tạo thành công điểm danh!'); });
      this.dialogRef.close(true);
    }, error => {
      this.notificationService.showNotification(3, '', 'Lỗi, Vui lòng thử lại sau!');
    });
  }

  public getAllClasses() {
    this.languageClassesService.getAllLanguageClasses().subscribe(result => {
      this.classes = result;
    }, error => {

    });
  }

  public getAllLecturers() {
    this.lecturersService.getAllLecturers().subscribe(result => {
      this.lecturers = result;
    }, error => {

    });
  }


  public getAllTutor() {
    this.lecturersService.getAllTutors().subscribe(result => {
      this.tutors = result;
    }, error => {

    });
  }

}
