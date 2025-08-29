import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material.module';
import { HeaderCategoriesComponent } from './components/header-categories/header-categories.component';
import { ViewSintaxisComponent } from './components/view-sintaxis/view-sintaxis.component';
import { LoaderSharedComponent } from './components/loader-shared/loader-shared.component';

@NgModule({
  declarations: [HeaderCategoriesComponent, ViewSintaxisComponent, LoaderSharedComponent],
  imports: [CommonModule, MaterialModule],
  exports: [HeaderCategoriesComponent, ViewSintaxisComponent, LoaderSharedComponent]
})
export class SharedModule {} 