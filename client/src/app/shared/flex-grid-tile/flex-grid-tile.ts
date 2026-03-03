import { ChangeDetectorRef, Directive, Input, OnDestroy, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Subscription } from 'rxjs';
import { MatGridTile } from '@angular/material/grid-list';

import { ViewportEvent, ViewportSize } from './interfaces';

@Directive({
    // tslint:disable-next-line: directive-selector
    selector: '[FlexGridTile]',
    standalone: false
})
export class FlexGridTile implements OnInit, OnDestroy {
  // tslint:disable-next-line: variable-name
  private _colspan!: number;
  // tslint:disable-next-line: variable-name
  private _rowspan!: number;
  // tslint:disable-next-line: variable-name
  private _sub!: Subscription;

  @Input() xsCol!: number;
  @Input() smCol!: number;
  @Input() mdCol!: number;
  @Input() lgCol!: number;
  @Input() xlCol!: number;

  @Input() xsRow!: number;
  @Input() smRow!: number;
  @Input() mdRow!: number;
  @Input() lgRow!: number;
  @Input() xlRow!: number;

  constructor(
    // tslint:disable-next-line: variable-name
    private _host: MatGridTile,
    // tslint:disable-next-line: variable-name
    private _changeDet: ChangeDetectorRef,
    // tslint:disable-next-line: variable-name
    private _breakpoint: BreakpointObserver,
  ) {
    if (!(this._host instanceof MatGridTile)) {
      throw new Error('This directive only can be used in "mat-grid-tile" component instances.');
    }
  }

  ngOnInit(): void {
    this._colspan = this._host.colspan;
    this._rowspan = this._host.rowspan;

    const obs = this._breakpoint.observe([
      Breakpoints.XSmall,
      Breakpoints.Small,
      Breakpoints.Medium,
      Breakpoints.Large,
      Breakpoints.XLarge
    ]);

    this._sub = obs.subscribe({
      next: this.onBreakpointChange.bind(this)
    });
  }

  ngOnDestroy(): void {
    this._sub?.unsubscribe();
  }

  onBreakpointChange(e: ViewportEvent): void {
    const breakpoint = Object
      .keys(e.breakpoints)
      .find(x => !!(e.breakpoints as any)[x]);

    let size: ViewportSize;
    switch (breakpoint) {
      case Breakpoints.XSmall:
        size = ViewportSize.XS;
        break;
      case Breakpoints.Small:
        size = ViewportSize.SM;
        break;
      case Breakpoints.Medium:
        size = ViewportSize.MD;
        break;
      case Breakpoints.Large:
        size = ViewportSize.LG;
        break;
      case Breakpoints.XLarge:
        size = ViewportSize.XL;
        break;
      default:
        throw new Error('Invalid viewport size');
    }

    this._host.colspan = this.getCurrentColSize(size);
    this._host.rowspan = this.getCurrentRowSize(size);
    this._changeDet.markForCheck();
  }

  getCurrentColSize(size: ViewportSize): number {
    const sizes = [ this.xsCol, this.smCol, this.mdCol, this.lgCol, this.xlCol ];
    if (sizes[size]) {
      return sizes[size];
    }

    for (let i = size; i >= 0; i--) {
      if (typeof sizes[i] === 'number') {
        return sizes[i];
      }
    }

    for (let i = size; i < sizes.length; i++) {
      if (typeof sizes[i] === 'number') {
        return sizes[i];
      }
    }

    const t = this._host._gridList?.cols;
    if (typeof t === 'number') {
      return this._colspan ?? t;
    } else {
      throw new Error('The current "mat-grid-tile" isn\'t a "mat-grid-list" child.');
    }
  }

  getCurrentRowSize(size: ViewportSize): number {
    const sizes = [ this.xsRow, this.smRow, this.mdRow, this.lgRow, this.xlRow ];
    if (sizes[size]) {
      return sizes[size];
    }

    for (let i = size; i >= 0; i--) {
      if (typeof sizes[i] === 'number') {
        return sizes[i];
      }
    }

    for (let i = size; i < sizes.length; i++) {
      if (typeof sizes[i] === 'number') {
        return sizes[i];
      }
    }

    return this._rowspan ?? 1;
  }
}
