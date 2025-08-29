import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputsRoutingModule } from './inputs-routing.module';
import { MaterialModule } from 'src/app/shared/material.module';
import { AllInputsComponent } from './components/all-inputs/all-inputs.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { SharedModule } from '../../shared/shared.module';
import { CodeInputComponent } from './components/code-input/code-input.component';
import { CodeInputDateComponent } from './components/code-input-date/code-input-date.component';
import { CodeInputSearchComponent } from './components/code-input-search/code-input-search.component';
import { CodeInputPasswordComponent } from './components/code-input-password/code-input-password.component';
import { CodeInputSelectComponent } from './components/code-input-select/code-input-select.component';

@NgModule({
  declarations: [AllInputsComponent, CodeInputComponent, CodeInputDateComponent, CodeInputSearchComponent, CodeInputPasswordComponent, CodeInputSelectComponent],
  imports: [
    CommonModule,
    InputsRoutingModule,
    MaterialModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
    SharedModule
  ],
  exports: [AllInputsComponent]
})
export class InputsModule { } 