import { Component, OnInit, Input } from '@angular/core';
import { VenvitoService } from '../venvito.service';
import { MetricsData } from '../metrics-data';

@Component({
  selector: '[app-activity-row]',
  templateUrl: './activity-row.component.html',
  styleUrls: ['./activity-row.component.css']
})

export class ActivityRowComponent implements OnInit
{
  private inAmountEditing: boolean = false;
  private originalAmount: number;

  @Input() public data: MetricsData;

  constructor(private venvitoService: VenvitoService) { }

  ngOnInit()
  {
  }

  updateCount(delta)
  {
    if (this.data.value + delta < 0) return;

    this.data.value += delta;
    this.venvitoService.updateMetricsData(this.data);
  }

  editAmount()
  {
    this.originalAmount = this.data.value;
    this.inAmountEditing = true;
  }

  setAmount()
  {
    this.venvitoService.updateMetricsData(this.data);
    this.inAmountEditing = false;
  }

  cancelAmountEditing()
  {
    this.data.value = this.originalAmount;
    this.inAmountEditing = false;
  }

  get isValidAmount(): boolean
  {
    return (this.data.value >= 0 && this.data.value != null);
  }

  get saveAmountButonColor(): string
  {
    return (this.isValidAmount ? "green" : "silver");
  }
}
