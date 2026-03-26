import { Component, input } from '@angular/core';

@Component({
  selector: 'app-boolean-span',
  standalone: false,
  templateUrl: './boolean-span.html',
  styleUrl: './boolean-span.scss',
})
export class BooleanSpan {
  value = input<boolean>();
  trueLabel = input('True');
  falseLabel = input('False');
  emptyLabel = input('False');
}
