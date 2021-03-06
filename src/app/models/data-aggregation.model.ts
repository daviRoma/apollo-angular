/**
 * Data Aggregation Model
 *
 * Aggregate answers data for stats.
 */

export class DataAggregation {
  options?: OptionData[];
  elements?: ElementData[];
  other?: string;
  total: number;
}

class OptionData {
  label: string;
  value?: number;
}

class ElementData {
  name: string;
  values?: OptionData[];
}
