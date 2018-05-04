import { Component, OnInit, Input, Renderer2 } from '@angular/core';
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

  @Input() data: MetricsData;

  constructor(private venvitoService: VenvitoService, private renderer: Renderer2) { }

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

    window.setTimeout(
      () => { this.renderer.selectRootElement("#amount").focus(); },
      500
    );
  }

  setAmount()
  {
    if (!this.isValidAmount) return;

    this.venvitoService.updateMetricsData(this.data);
    this.inAmountEditing = false;
    console.log("setAmount()");
  }

  cancelAmountEditing()
  {
    this.data.value = this.originalAmount;
    this.inAmountEditing = false;
    this.renderer.selectRootElement("#amount").value = this.originalAmount + "";
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
