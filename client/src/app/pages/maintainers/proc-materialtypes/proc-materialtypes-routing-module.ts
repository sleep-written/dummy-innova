import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProcMaterialtypes } from './proc-materialtypes';

const routes: Routes = [{ path: '', component: ProcMaterialtypes }];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ProcMaterialtypesRoutingModule {}
