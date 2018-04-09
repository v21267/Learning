import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { DecimalPipe } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ChartsModule } from 'ng2-charts';

import
{
/*
  MatAutocompleteModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
*/
  MatFormFieldModule,
  MatDatepickerModule,
  MatNativeDateModule/*,
  MatDialogModule,
  MatDividerModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatStepperModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule
*/
} from '@angular/material';


import { AppComponent } from './app.component';
import { AppTitleComponent } from './app-title/app-title.component';
import { VenvitoService } from './venvito.service';
import { DateSwitcherComponent } from './date-switcher/date-switcher.component';
import { ActivitiesComponent } from './activities/activities.component';
import { ActivityRowComponent } from './activity-row/activity-row.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DashboardChartComponent } from './dashboard-chart/dashboard-chart.component';

@NgModule({
  declarations: [
    AppComponent,
    AppTitleComponent,
    DateSwitcherComponent,
    ActivitiesComponent,
    ActivityRowComponent,
    DashboardComponent,
    DashboardChartComponent
  ],
  imports: [
    NgbModule.forRoot(),
    BrowserModule,
    FormsModule,
    HttpModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    ChartsModule,
    RouterModule.forRoot([
      { path: '', redirectTo: 'activities', pathMatch: 'full' },
      { path: 'activities', component: ActivitiesComponent },
      { path: 'dashboard', component: DashboardComponent },
      { path: '**', redirectTo: 'activities' }
    ])

  ],
  providers: [
    VenvitoService,
    DecimalPipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
