import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MultiselectFilter } from './multiselect-filter';

import { LabelModule } from '@progress/kendo-angular-label';
import { MultiSelectModule } from '@progress/kendo-angular-dropdowns';
import { FilterInputDirective } from '@progress/kendo-angular-dropdowns';

@NgModule({
  declarations: [
    MultiselectFilter
  ],
  imports: [
    CommonModule,
    
    LabelModule,
    MultiSelectModule,
    FilterInputDirective,
],
  exports: [
    MultiselectFilter
  ]
})
export class KendoGridFiltersModule {}
