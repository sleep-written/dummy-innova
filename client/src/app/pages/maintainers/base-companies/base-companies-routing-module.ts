import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BaseCompanies } from './base-companies';

const routes: Routes = [{ path: '', component: BaseCompanies }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BaseCompaniesRoutingModule { }
