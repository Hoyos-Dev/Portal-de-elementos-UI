import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TablesRoutingModule } from './tables-routing.module';
import { AllTablesComponent } from './components/all-tables/all-tables.component';
import { MaterialModule } from 'src/app/shared/material.module';
import { SharedModule } from '../../shared/shared.module';
import { CodeTableComponent } from './components/code-table/code-table.component';
import { CodeDetailsComponent } from './components/code-details/code-details.component';

@NgModule({
  declarations: [AllTablesComponent, CodeTableComponent, CodeDetailsComponent],
  imports: [
    CommonModule,
    TablesRoutingModule,
    MaterialModule,
    SharedModule
  ],
  exports: [AllTablesComponent]
})
export class TablesModule { } 