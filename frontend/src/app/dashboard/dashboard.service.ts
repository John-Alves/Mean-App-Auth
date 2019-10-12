import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CONSTANTS } from '../constants';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private api = CONSTANTS.apiUrl;

  constructor(
    private http: HttpClient
  ) { }

  makeRequest(){
    return this.http.post(`${this.api}/dashboard`, {});
  }
}
