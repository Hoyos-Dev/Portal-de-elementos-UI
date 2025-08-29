import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ColorsRoutingModule } from './colors-routing.module';
import { AllColorsComponent } from './components/all-colors/all-colors.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [AllColorsComponent],
  imports: [
    CommonModule,
    ColorsRoutingModule,
    SharedModule
  ],
  exports: [AllColorsComponent]
})
export class ColorsModule { } 