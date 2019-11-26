import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LogSystemsService {

constructor( private httpClient: HttpClient) { }
getAllLogSystem() {
  return this.httpClient
    .get(`${environment.PLCServicesDomain}/api/LogSystems`);
}

SearchLog( userId, toDate,fromDate) {
  return this.httpClient
    .post(`${environment.PLCServicesDomain}/api/LogSystems/searchLog?userId=${userId}&toDate=${toDate}&fromDate=${fromDate}`, null);
}

}
