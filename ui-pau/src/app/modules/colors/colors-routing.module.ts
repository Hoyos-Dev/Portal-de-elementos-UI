import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllColorsComponent } from './components/all-colors/all-colors.component';

const routes: Routes = [
  { path: '', component: AllColorsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ColorsRoutingModule {} 