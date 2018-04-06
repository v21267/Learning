import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { MetricsDefinition } from './metrics-definition';
import { Observable } from 'rxjs/Observable';
import { MetricsData } from './metrics-data';

@Injectable()
export class VenvitoService
{
  private currentDateSource = new BehaviorSubject<Date>(new Date());
  private currentDate: Observable<Date> = this.currentDateSource.asObservable();

  constructor(private httpService: Http) { }

  getCurrentDate(): Observable<Date>
  {
    return this.currentDate;
  }

  setCurrentDate(date: Date)
  {
    this.currentDateSource.next(date);
  }

  static addDays(date: Date, delta: number): Date
  {
    return new Date(date.getTime() + delta * (1000 * 60 * 60 * 24));
  }
  /*
  shiftCurrentDate(delta: number)
  {
    this.currentDate.subscribe(date =>
    {
      debugger;
      console.log(date);
      const newDate = VenvitoService.addDays(date, delta);
      console.log(newDate);
      this.setCurrentDate(newDate);
      this.getCurrentDate().subscribe(updatedDate => { console.log(updatedDate); console.log("----"); });
    });
  }
  */
  getMetricsDefinitions()
  {
    return this.httpService.get('/api/MetricsDictionary');
  }


  static dateToString(date: Date): string
  {
    const d: string =
      date.getFullYear().toString().padStart(4, "0") +
      (date.getMonth() + 1).toString().padStart(2, "0") +
      date.getDate().toString().padStart(2, "0");
    return d;
  }

  getMetricsData(date: Date)
  {
    const d: string = VenvitoService.dateToString(date);
    const url: string = '/api/MetricsData/' + d;
    return this.httpService.get(url);
  }


  updateMetricsData(data: MetricsData)
  {
    const url: string = '/api/MetricsData/';
    return this.httpService.post(url, data).subscribe();
  }
}
