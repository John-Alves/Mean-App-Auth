import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../dashboard.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    private dashboardService: DashboardService
  ) { }

  ngOnInit() {
    this.dashboardService.makeRequest().subscribe(
      () => {
        console.log("REQUISITOU");
      }
    )
  }

  doRequest(){
    this.dashboardService.makeRequest().subscribe(
      () => {
        console.log("REQUISITOU");
      }
    )
  }

}
