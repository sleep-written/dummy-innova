import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BooleanSpan } from './boolean-span';
import { NumericSpan } from './numeric-span';

@NgModule({
  declarations: [
    BooleanSpan,
    NumericSpan
  ],
  imports: [
    CommonModule
  ],
  exports: [
    BooleanSpan,
    NumericSpan
  ],
})
export class PrimitiveSpanModule {}
