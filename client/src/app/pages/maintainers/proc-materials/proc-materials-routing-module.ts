import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProcMaterials } from './proc-materials';

const routes: Routes = [{ path: '', component: ProcMaterials }];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ProcMaterialsRoutingModule {}
