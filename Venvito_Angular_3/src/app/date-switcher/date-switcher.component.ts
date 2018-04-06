import { Component, OnInit, OnDestroy } from '@angular/core';
import { VenvitoService } from '../venvito.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-date-switcher',
  templateUrl: './date-switcher.component.html',
  styleUrls: ['./date-switcher.component.css']
})

export class DateSwitcherComponent implements OnInit, OnDestroy
{
  private subscription: Subscription;
  private calendarDate: Date;

  constructor(private venvitoService: VenvitoService) { }

  ngOnInit()
  {
    this.subscription = this.venvitoService.getCurrentDate().subscribe(
      date => this.calendarDate = date);
  }

  ngOnDestroy()
  {
    if (this.subscription != null) this.subscription.unsubscribe();
  }

  get currentDateCaption(): String
  {
    return (this.isToday     ? "Today" :
            this.isYesterday ? "Yesterday" :
                               this.calendarDate.toDateString());
  }

  shiftDate(delta: number)
  {
    const newDate = VenvitoService.addDays(this.calendarDate, delta);
    this.venvitoService.setCurrentDate(newDate);
  }

  get isToday(): Boolean
  {
    return (this.calendarDate.toDateString() ==
            new Date().toDateString());
  }

  get isYesterday(): Boolean
  {
    return (this.calendarDate.toDateString() ==
            VenvitoService.addDays(new Date(), -1).toDateString());
  }

  setCalendarDate(date: Date) 
  {
    this.venvitoService.setCurrentDate(date);
  }

  get today(): Date
  {
    return new Date();
  }
}
