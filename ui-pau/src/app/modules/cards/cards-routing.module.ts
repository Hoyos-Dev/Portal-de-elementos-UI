import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllCardsComponent } from './components/all-cards/all-cards.component';
import { CodeCardDetailsComponent } from './components/code-card-details/code-card-details.component';
import { CodeCardDetailsImagesComponent } from './components/code-card-details-images/code-card-details-images.component';

const routes: Routes = [
  { path: '', component: AllCardsComponent },
  { path: 'code-card-details', component: CodeCardDetailsComponent },
  { path: 'code-card-details-image', component: CodeCardDetailsImagesComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CardsRoutingModule {} 