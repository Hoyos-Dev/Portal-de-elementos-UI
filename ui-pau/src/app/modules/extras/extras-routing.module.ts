import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllExtrasComponent } from './components/all-extras/all-extras.component';
import { CodeHeaderComponent } from './components/code-header/code-header.component';
import { CodeTooltipsComponent } from './components/code-tooltips/code-tooltips.component';
import { CodeTabsComponent } from './components/code-tabs/code-tabs.component';

const routes: Routes = [
  { path: '', component: AllExtrasComponent },
  { path: 'code-header', component: CodeHeaderComponent },
  { path: 'code-tooltips', component: CodeTooltipsComponent },
  { path: 'code-tabs', component: CodeTabsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExtrasRoutingModule {} 