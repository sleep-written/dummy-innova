import { Component, input } from '@angular/core';

@Component({
  selector: 'app-numeric-span',
  standalone: false,
  templateUrl: './numeric-span.html',
  styleUrl: './numeric-span.scss',
})
export class NumericSpan {
  value = input<number>();
  emptyLabel = input('empty');

  language = input('en-US');
  options = input<Intl.NumberFormatOptions>({});

  formatValue(value: number): string {
    return Intl
      .NumberFormat(
        this.language(),
        this.options()
      )
      .format(value);
  }
}
