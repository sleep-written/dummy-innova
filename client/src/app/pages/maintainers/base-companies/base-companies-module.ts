import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BaseCompaniesRoutingModule } from './base-companies-routing-module';
import { BaseCompanies } from './base-companies';


@NgModule({
  declarations: [
    BaseCompanies
  ],
  imports: [
    CommonModule,
    BaseCompaniesRoutingModule
  ]
})
export class BaseCompaniesModule { }
