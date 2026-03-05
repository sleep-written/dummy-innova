import { AfterViewInit, ChangeDetectionStrategy, Component, input, signal } from '@angular/core';
import { CompositeFilterDescriptor, FilterDescriptor } from '@progress/kendo-data-query';
import { ColumnComponent, FilterService } from '@progress/kendo-angular-grid';

@Component({
  selector: 'app-multiselect-filter',
  standalone: false,
  templateUrl: './multiselect-filter.html',
  styleUrl: './multiselect-filter.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MultiselectFilter<T> implements AfterViewInit {
  data = input.required<T[]>();
  textField = input.required<string>();
  valueField = input.required<string>();

  title = input<string | undefined>();
  column = input.required<ColumnComponent>();
  filter = input.required<CompositeFilterDescriptor>();
  filterService = input.required<FilterService>();

  value = signal<undefined[]>([]);

  ngAfterViewInit(): void {
    const column = this.column();
    const filter = this.filter();
    const value = (filter.filters as FilterDescriptor[])
      .filter(x => x.field === column.field)
      .map(x => x.value);

    this.value.set(value);
  }

  valueChanges(values: unknown[]): void {
    const filterService = this.filterService();
    const column = this.column();
    filterService.filter({
      logic: 'or',
      filters: values.map(value => ({
        operator: 'eq',
        field: column.field,
        value
      }))
    });
  }
}
