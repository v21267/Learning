import { Component, OnInit } from '@angular/core';
import { DashboardChartComponent } from '../dashboard-chart/dashboard-chart.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit
{
  private dateRange: string = "W";

  constructor() { }

  ngOnInit()
  {
  }

  setDateRange(dateRange: string): boolean
  {
    this.dateRange = dateRange;
    return false;
  }

}
