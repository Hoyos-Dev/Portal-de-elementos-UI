import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllAlertsComponent } from './components/all-alerts/all-alerts.component';
import { CodeAlertSuccessfulComponent } from './components/code-alert-successful/code-alert-successful.component';
import { CodeAlertErrorComponent } from './components/code-alert-error/code-alert-error.component';
import { CodeAlertWarningComponent } from './components/code-alert-warning/code-alert-warning.component';
import { CodeAlertInfoComponent } from './components/code-alert-info/code-alert-info.component';

const routes: Routes = [
  { path: '', component: AllAlertsComponent },
  { path: 'code-alert-successful', component: CodeAlertSuccessfulComponent },
  { path: 'code-alert-error', component: CodeAlertErrorComponent },
  { path: 'code-alert-warning', component: CodeAlertWarningComponent },
  { path: 'code-alert-info', component: CodeAlertInfoComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AlertsRoutingModule {} 