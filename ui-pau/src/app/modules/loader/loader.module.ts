import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderRoutingModule } from './loader-routing.module';
import { AllLoaderComponent } from './components/all-loader/all-loader.component';
import { MaterialModule } from 'src/app/shared/material.module';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { SharedModule } from '../../shared/shared.module';
import { CodeLoaderComponent } from './components/code-loader/code-loader.component';
import { CodeLoadingBarComponent } from './components/code-loading-bar/code-loading-bar.component';

@NgModule({
  declarations: [AllLoaderComponent, CodeLoaderComponent, CodeLoadingBarComponent],
  imports: [
    CommonModule,
    LoaderRoutingModule,
    MaterialModule,
    MatProgressBarModule,
    SharedModule
  ],
  exports: [AllLoaderComponent]
})

export class LoaderModule { } 