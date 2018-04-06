import { Component, OnInit } from '@angular/core';
import { VenvitoService } from './venvito.service';
import { AppTitleComponent } from './app-title/app-title.component';
import { DateSwitcherComponent } from './date-switcher/date-switcher.component';
import { ActivitiesComponent } from './activities/activities.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit
{
  constructor(private venvitoService: VenvitoService) { }

  ngOnInit()
  {
  }
}
