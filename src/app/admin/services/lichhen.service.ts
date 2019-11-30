import { environment } from '../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LichhenService {

  constructor(private httpClient: HttpClient) { }

  getAll() {
    return this.httpClient
      .get(`${environment.PLCServicesDomain}/api/InforLearners`);
  }
}
