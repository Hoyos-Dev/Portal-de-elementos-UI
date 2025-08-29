import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllInputsComponent } from './components/all-inputs/all-inputs.component';
import { CodeInputComponent } from './components/code-input/code-input.component';
import { CodeInputDateComponent } from './components/code-input-date/code-input-date.component';
import { CodeInputSearchComponent } from './components/code-input-search/code-input-search.component';
import { CodeInputPasswordComponent } from './components/code-input-password/code-input-password.component';
import { CodeInputSelectComponent } from './components/code-input-select/code-input-select.component';

const routes: Routes = [
  { path: '', component: AllInputsComponent },
  { path: 'code-input', component: CodeInputComponent },
  { path: 'code-input-date', component: CodeInputDateComponent },
  { path: 'code-input-search', component: CodeInputSearchComponent },
  { path: 'code-input-password', component: CodeInputPasswordComponent },
  { path: 'code-input-select', component: CodeInputSelectComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InputsRoutingModule {} 
