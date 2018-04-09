import { MetricsDefinition } from './metrics-definition';
import { MetricsChartData } from './metrics-chart-data';

export class MetricsChart extends MetricsDefinition
{
  totalValue: number;
  chartData: MetricsChartData[];
}
