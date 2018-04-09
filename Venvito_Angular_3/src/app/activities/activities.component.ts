import { Component, OnInit, OnDestroy } from '@angular/core';
import { MetricsData } from '../metrics-data';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { VenvitoService } from '../venvito.service';
import { DateSwitcherComponent } from '../date-switcher/date-switcher.component';
import { ActivityRowComponent } from '../activity-row/activity-row.component';

@Component({
  selector: 'app-activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.css']
})

export class ActivitiesComponent implements OnInit, OnDestroy
{
  private subscription: Subscription;
  private metricsData: MetricsData[];

  constructor(private venvitoService: VenvitoService) { }

  ngOnInit()
  {
    this.loadActivities();
  }

  ngOnDestroy()
  {
    if (this.subscription != null) this.subscription.unsubscribe();
  }

  loadActivities()
  {
    this.subscription = this.venvitoService.getCurrentDate().subscribe(date =>
    {
      this.venvitoService.getMetricsData(date).subscribe(
        result =>
        {
          this.metricsData = result.json() as MetricsData[];
        },
        error =>
        {
          console.error(error)
        }
      );
    });
  }
}
