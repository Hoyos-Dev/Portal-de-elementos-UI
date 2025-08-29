import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonsRoutingModule } from './buttons-routing.module';
import { AllButtonsComponent } from './components/all-buttons/all-buttons.component';
import { MaterialModule } from 'src/app/shared/material.module';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon'
import { SharedModule } from '../../shared/shared.module';
import { CodePrimaryButtonComponent } from './components/code-primary-button/code-primary-button.component';
import { CodeSecondaryButtonsComponent } from './components/code-secondary-button/code-secondary-button.component';
import { CodeDisabledButtonComponent } from './components/code-disabled-button/code-disabled-button.component';
import { CodeExpandedButtonComponent } from './components/code-expanded-button/code-expanded-button.component';
import { CodeButtonPlusIconComponent } from './components/code-button-plus-icon/code-button-plus-icon.component';
import { CodeRadioButtonComponent } from './components/code-radio-button/code-radio-button.component';

@NgModule({
  declarations: [AllButtonsComponent, CodePrimaryButtonComponent, CodeSecondaryButtonsComponent, CodeDisabledButtonComponent, CodeExpandedButtonComponent, CodeButtonPlusIconComponent, CodeRadioButtonComponent],
  imports: [
    CommonModule,
    ButtonsRoutingModule,
    MaterialModule,
    FormsModule,
    SharedModule
  ],
  exports: [AllButtonsComponent]
})
export class ButtonsModule { } 