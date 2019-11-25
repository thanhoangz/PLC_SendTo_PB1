import { environment } from '../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AttendanceSheetService {

  constructor(private httpClient: HttpClient) { }

  postAttendance(attendance: any) {
    return this.httpClient
      .post(`${environment.PLCServicesDomain}/api/AttendanceSheets`, attendance);
  }


  postAttendanceList(userId, lecturerId, tutorId, classId, month, year) {
    return this.httpClient
      // tslint:disable-next-line: max-line-length
      .post(`${environment.PLCServicesDomain}/api/AttendanceSheets?userId=${userId}&lecturerId=${lecturerId}&tutorId=${tutorId}&classId=${classId}&month=${month}&year=${year}`, null);
  }

  getByDateClass(classId, date) {
    return this.httpClient
      .get(`${environment.PLCServicesDomain}/api/AttendanceSheets/getByDate?classId=${classId}&date=${date}`);
  }

  getClassesByCoure(courseId) {
    return this.httpClient
      .post(`${environment.PLCServicesDomain}/api/TeachingSchedules/get-all-class-and-full-info?courseId=${courseId}`, null);
  }


  getAttendanceByClassAndDate(classId, date) {
    console.log(classId);
    console.log(date);
    return this.httpClient
      .get(`${environment.PLCServicesDomain}/api/AttendanceSheets/attendance/${classId}?date=${date}`);
  }
}
