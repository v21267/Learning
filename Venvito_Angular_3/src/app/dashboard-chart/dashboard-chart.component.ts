import { Component, OnInit, Input } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { MetricsChart } from '../metrics-chart';
import { MetricsChartData } from '../metrics-chart-data';

@Component({
  selector: 'app-dashboard-chart',
  templateUrl: './dashboard-chart.component.html',
  styleUrls: ['./dashboard-chart.component.css']
})

export class DashboardChartComponent implements OnInit
{
  @Input() chart: MetricsChart;

  private barChartData: any[];
  private barChartLabels: string[];
  private barChartColors: any[];
  private barChartType: string = 'bar';
  private barChartLegend: boolean = false;

  constructor(private decimalPipe: DecimalPipe) { }

  ngOnInit()
  {
    this.setBarChartData();
    this.setBarChartLabels();
    this.setBarChartColors();
  }

  public barChartOptions: any =
    {
      scales: {
        xAxes: [{
          barPercentage: 0.4,
          gridLines: {
            display: false
          },
          ticks: {
            fontColor: "grey"
          }
        }],
        yAxes: [{
          ticks: {
            beginAtZero: true,
            fontColor: "grey",
            callback: (value, index, values) =>
            {
              return this.formatYAxisValue(this.chart, value);
            }
          },
          gridLines: {
            zeroLineColor: "grey"
          }
        }],
      },

      tooltips: {
        callbacks: {
          label: (tooltipItem, data) =>
          {
            let value = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index] || '';
            let label = this.decimalPipe.transform(value, '1.0-0'); // $12,345
            return (this.chart.type == "AMOUNT" ? "$" : "") + label;
          }
        }
      },

      animation: false,
      scaleShowVerticalLines: false,
      responsive: true,
    };

  private setBarChartData()
  {
    let result = new Array();
    for (let i = 0; i < this.chart.chartData.length; i++)
    {
      result.push(this.chart.chartData[i].value);
    }

    this.barChartData = [{ data: result }];
  }

  private setBarChartLabels()
  {
    let result = new Array();
    for (let i = 0; i < this.chart.chartData.length; i++)
    {
      result.push(this.chart.chartData[i].periodName);
    }

    this.barChartLabels = result;
  }

  private setBarChartColors()
  {
    let barColor =
      {
        backgroundColor: this.chart.color
      }
    this.barChartColors = [barColor];
  }

  private get hasData(): boolean
  {
    for (let i = 0; i < this.chart.chartData.length; i++)
    {
      if (this.chart.chartData[i].value > 0) return true;
    }
    return false;
  }

  private formatYAxisValue(chart: MetricsChart, value: number): string
  {
    const suffix = ["", "k", "M", "G", "T", "P", "E"];
    let index = 0;
    let dvalue = value;
    while ((value /= 1000) >= 1 && ++index) dvalue /= 1000;
    let result =
      (chart.type == "AMOUNT" ? "$" : "") +
      Math.round(dvalue).toString() + suffix[index];
    return result;
  }
}

