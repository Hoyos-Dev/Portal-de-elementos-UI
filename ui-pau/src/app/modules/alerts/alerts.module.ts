import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertsRoutingModule } from './alerts-routing.module';
import { AllAlertsComponent } from './components/all-alerts/all-alerts.component';
import { MaterialModule } from 'src/app/shared/material.module';
import { SharedModule } from '../../shared/shared.module';
import { CodeAlertSuccessfulComponent } from './components/code-alert-successful/code-alert-successful.component';
import { CodeAlertInfoComponent } from './components/code-alert-info/code-alert-info.component';
import { CodeAlertErrorComponent } from './components/code-alert-error/code-alert-error.component';
import { CodeAlertWarningComponent } from './components/code-alert-warning/code-alert-warning.component';

@NgModule({
  declarations: [AllAlertsComponent, CodeAlertSuccessfulComponent, CodeAlertInfoComponent, CodeAlertErrorComponent, CodeAlertWarningComponent],
  imports: [
    CommonModule,
    AlertsRoutingModule,
    MaterialModule,
    SharedModule
  ],
  exports: [AllAlertsComponent]
})
export class AlertsModule { } 