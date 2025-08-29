import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllTablesComponent } from './components/all-tables/all-tables.component';
import { CodeTableComponent } from './components/code-table/code-table.component';
import { CodeDetailsComponent } from './components/code-details/code-details.component';

const routes: Routes = [
  { path: '', component: AllTablesComponent },
  { path: 'code-table', component: CodeTableComponent },
  { path: 'code-details', component: CodeDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TablesRoutingModule {} 