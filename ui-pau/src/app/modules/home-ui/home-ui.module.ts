import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeUiRoutingModule } from './home-ui-routing.module';
import { HeadUiComponent } from './components/head-ui/head-ui.component';
import { CategoriesUiComponent } from './components/categories-ui/categories-ui.component';
import { OrchestratorComponent } from './pages/orchestrator/orchestrator.component';
import { UiGeneralComponent } from './components/ui-general/ui-general.component';
import { MaterialModule } from 'src/app/shared/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatPaginatorIntl } from '@angular/material/paginator';

import { ButtonsModule } from '../buttons/buttons.module';
import { TablesModule } from '../tables/tables.module';
import { InputsModule } from '../inputs/inputs.module';
import { IconsModule } from '../icons/icons.module';
import { LoaderModule } from '../loader/loader.module';
import { ColorsModule } from '../colors/colors.module';
import { AlertsModule } from '../alerts/alerts.module';
import { CardsModule } from '../cards/cards.module';
import { TypographyModule } from '../typography/typography.module';
import { ExtrasModule } from '../extras/extras.module';
import { ImagesModule } from '../images/images.module';

export function getSpanishPaginatorIntl() {
  const paginatorIntl = new MatPaginatorIntl();
  paginatorIntl.itemsPerPageLabel = 'Elementos por página';
  paginatorIntl.nextPageLabel = 'Siguiente';
  paginatorIntl.previousPageLabel = 'Anterior';
  paginatorIntl.firstPageLabel = 'Primera página';
  paginatorIntl.lastPageLabel = 'Última página';
  paginatorIntl.getRangeLabel = (page: number, pageSize: number, length: number) => {
    if (length === 0 || pageSize === 0) {
      return `0 de ${length}`;
    }
    length = Math.max(length, 0);
    const startIndex = page * pageSize;
    const endIndex = startIndex < length ?
      Math.min(startIndex + pageSize, length) :
      startIndex + pageSize;
    return `${startIndex + 1} – ${endIndex} de ${length}`;
  };
  return paginatorIntl;
}

@NgModule({
  declarations: [
    HeadUiComponent,
    CategoriesUiComponent,
    OrchestratorComponent,
    UiGeneralComponent
  ],
  imports: [
    CommonModule,
    HomeUiRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    ClipboardModule,
    MatSnackBarModule,
    ButtonsModule,
    TablesModule,
    InputsModule,
    IconsModule,
    LoaderModule,
    ColorsModule,
    AlertsModule,
    CardsModule,
    TypographyModule,
    ExtrasModule,
    ImagesModule
  ],
  providers: [
    { provide: MatPaginatorIntl, useValue: getSpanishPaginatorIntl() }
  ]
})
export class HomeUiModule { }
