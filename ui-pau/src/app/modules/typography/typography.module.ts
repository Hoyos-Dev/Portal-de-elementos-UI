import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TypographyRoutingModule } from './typography-routing.module';
import { AllTypographyComponent } from './components/all-typography/all-typography.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [AllTypographyComponent],
  imports: [
    CommonModule,
    TypographyRoutingModule,
    SharedModule
  ],
  exports: [AllTypographyComponent]
})
export class TypographyModule { } 