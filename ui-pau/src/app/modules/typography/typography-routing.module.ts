import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllTypographyComponent } from './components/all-typography/all-typography.component';

const routes: Routes = [
  { path: '', component: AllTypographyComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TypographyRoutingModule {} 