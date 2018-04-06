import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

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

@NgModule({
  declarations: [
    AppComponent,
    AppTitleComponent,
    DateSwitcherComponent,
    ActivitiesComponent,
    ActivityRowComponent
  ],
  imports: [
    NgbModule.forRoot(),
    BrowserModule,
    FormsModule,
    HttpModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule
  ],
  providers: [VenvitoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
