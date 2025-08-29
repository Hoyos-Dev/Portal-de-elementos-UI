import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrchestratorComponent } from './pages/orchestrator/orchestrator.component';
import { UiGeneralComponent } from './components/ui-general/ui-general.component';

const routes: Routes = [
  {
    path: '',
    component: OrchestratorComponent,
    children: [
      { path: '', component: UiGeneralComponent },
      { path: 'botones', loadChildren: () => import('../buttons/buttons.module').then(m => m.ButtonsModule) },
      { path: 'colores', loadChildren: () => import('../colors/colors.module').then(m => m.ColorsModule) },
      { path: 'alertas', loadChildren: () => import('../alerts/alerts.module').then(m => m.AlertsModule) },
      { path: 'tablas', loadChildren: () => import('../tables/tables.module').then(m => m.TablesModule) },
      { path: 'inputs', loadChildren: () => import('../inputs/inputs.module').then(m => m.InputsModule) },
      { path: 'icons', loadChildren: () => import('../icons/icons.module').then(m => m.IconsModule) },
      { path: 'loader', loadChildren: () => import('../loader/loader.module').then(m => m.LoaderModule) },
      { path: 'cards', loadChildren: () => import('../cards/cards.module').then(m => m.CardsModule) },
      { path: 'extras', loadChildren: () => import('../extras/extras.module').then(m => m.ExtrasModule) },
      { path: 'typography', loadChildren: () => import('../typography/typography.module').then(m => m.TypographyModule) },
      { path: 'images', loadChildren: () => import('../images/images.module').then(m => m.ImagesModule) },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeUiRoutingModule { }
