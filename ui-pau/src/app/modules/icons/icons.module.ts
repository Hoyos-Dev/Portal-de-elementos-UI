import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconsRoutingModule } from './icons-routing.module';
import { AllIconsComponent } from './components/all-icons/all-icons.component';
import { MaterialModule } from 'src/app/shared/material.module';
import { SharedModule } from '../../shared/shared.module';
import { CodeIconsComponent } from './components/code-icons/code-icons.component';

@NgModule({
  declarations: [AllIconsComponent, CodeIconsComponent],
  imports: [
    CommonModule,
    IconsRoutingModule,
    MaterialModule,
    SharedModule
  ],
  exports: [AllIconsComponent]
})
export class IconsModule { } 