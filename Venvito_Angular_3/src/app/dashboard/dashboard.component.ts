import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { VenvitoService } from '../venvito.service';
import { MetricsChart } from '../metrics-chart';
import { MetricsChartData } from '../metrics-chart-data';
import { DashboardChartComponent } from '../dashboard-chart/dashboard-chart.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit, OnDestroy
{
  private dateRange: string = "7";

  private subscription: Subscription;
  private charts: MetricsChart[];

  constructor(private venvitoService: VenvitoService) { }

  ngOnInit()
  {
    this.loadCharts();
  }

  ngOnDestroy()
  {
    if (this.subscription != null) this.subscription.unsubscribe();
  }

  loadCharts()
  {
    this.subscription = this.venvitoService.getMetricsChart(this.dateRange).subscribe(
      result =>
      {
        this.charts = result.json() as MetricsChart[];
      },
      error =>
      {
        console.error(error)
      }
    );
  }

  setDateRange(dateRange: string): boolean
  {
    this.dateRange = dateRange;
    this.loadCharts();
    return false;
  }

}
