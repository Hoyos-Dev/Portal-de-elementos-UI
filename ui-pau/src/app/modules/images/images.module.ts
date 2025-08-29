import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImagesRoutingModule } from './images-routing.module';
import { AllImagesComponent } from './components/all-images/all-images.component';
import { MaterialModule } from 'src/app/shared/material.module';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [AllImagesComponent],
  imports: [
    CommonModule,
    ImagesRoutingModule,
    MaterialModule,
    SharedModule
  ],
  exports: [AllImagesComponent]
})
export class ImagesModule { } 