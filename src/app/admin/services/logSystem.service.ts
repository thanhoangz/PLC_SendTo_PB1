import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LogSystemService {

  constructor(private httpClient: HttpClient) { }

  logStudyProcessbyLearnerId(learnerId) {
    return this.httpClient
      .post(`${environment.PLCServicesDomain}/api/LogSystems/get-studyprocess-by-learnerId?learnerId=${learnerId}`, null);
  }
}
