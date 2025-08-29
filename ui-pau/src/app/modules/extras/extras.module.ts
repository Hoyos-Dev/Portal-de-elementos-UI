import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExtrasRoutingModule } from './extras-routing.module';
import { AllExtrasComponent } from './components/all-extras/all-extras.component';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MaterialModule } from 'src/app/shared/material.module';
import { SharedModule } from '../../shared/shared.module';
import { CodeHeaderComponent } from './components/code-header/code-header.component';
import { CodeTooltipsComponent } from './components/code-tooltips/code-tooltips.component';
import { CodeTabsComponent } from './components/code-tabs/code-tabs.component';

@NgModule({
  declarations: [AllExtrasComponent, CodeHeaderComponent, CodeTooltipsComponent, CodeTabsComponent],
  imports: [
    CommonModule,
    ExtrasRoutingModule,
    MaterialModule,
    MatChipsModule,
    MatIconModule,
    MatTabsModule,
    SharedModule
  ],
  exports: [AllExtrasComponent]
})
export class ExtrasModule { } 