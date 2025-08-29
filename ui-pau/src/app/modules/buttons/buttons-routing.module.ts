import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllButtonsComponent } from './components/all-buttons/all-buttons.component';
import { CodePrimaryButtonComponent } from './components/code-primary-button/code-primary-button.component';
import { CodeSecondaryButtonsComponent } from './components/code-secondary-button/code-secondary-button.component';
import { CodeDisabledButtonComponent } from './components/code-disabled-button/code-disabled-button.component';
import { CodeExpandedButtonComponent } from './components/code-expanded-button/code-expanded-button.component';
import { CodeButtonPlusIconComponent } from './components/code-button-plus-icon/code-button-plus-icon.component';
import { CodeRadioButtonComponent } from './components/code-radio-button/code-radio-button.component';

const routes: Routes = [
  { path: '', component: AllButtonsComponent },
  { path: 'code-primary', component: CodePrimaryButtonComponent },
  { path: 'code-secondary', component: CodeSecondaryButtonsComponent },
  { path: 'code-disable', component: CodeDisabledButtonComponent },
  { path: 'code-expanded', component: CodeExpandedButtonComponent },
  { path: 'code-button-plus-icon', component: CodeButtonPlusIconComponent },
  { path: 'code-radio-button', component: CodeRadioButtonComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ButtonsRoutingModule {} 