import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardsRoutingModule } from './cards-routing.module';
import { AllCardsComponent } from './components/all-cards/all-cards.component';
import { MaterialModule } from 'src/app/shared/material.module';
import { SharedModule } from '../../shared/shared.module';
import { CodeCardDetailsComponent } from './components/code-card-details/code-card-details.component';
import { CodeCardDetailsImagesComponent } from './components/code-card-details-images/code-card-details-images.component';

@NgModule({
  declarations: [AllCardsComponent, CodeCardDetailsComponent, CodeCardDetailsImagesComponent],
  imports: [
    CommonModule,
    CardsRoutingModule,
    MaterialModule,
    SharedModule
  ],
  exports: [AllCardsComponent]
})
export class CardsModule { } 