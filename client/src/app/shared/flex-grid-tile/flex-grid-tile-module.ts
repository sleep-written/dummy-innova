import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatGridListModule } from '@angular/material/grid-list';

import { FlexGridTile } from './flex-grid-tile';

@NgModule({
  declarations: [
    FlexGridTile
  ],
  imports: [
    CommonModule
  ],
  exports: [
    FlexGridTile,
    MatGridListModule
  ]
})
export class FlexGridTileModule { }
