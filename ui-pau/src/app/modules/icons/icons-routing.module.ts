import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllIconsComponent } from './components/all-icons/all-icons.component';
import { CodeIconsComponent } from './components/code-icons/code-icons.component';

const routes: Routes = [
  { path: '', component: AllIconsComponent },
  { path: 'code-icons', component: CodeIconsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IconsRoutingModule {} 