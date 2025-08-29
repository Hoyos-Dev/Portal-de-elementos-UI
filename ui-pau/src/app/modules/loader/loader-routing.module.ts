import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllLoaderComponent } from './components/all-loader/all-loader.component';
import { CodeLoaderComponent } from './components/code-loader/code-loader.component';
import { CodeLoadingBarComponent } from './components/code-loading-bar/code-loading-bar.component';

const routes: Routes = [
  { path: '', component: AllLoaderComponent },
  { path: 'code-loader', component: CodeLoaderComponent },
  { path: 'code-loading-bar', component: CodeLoadingBarComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoaderRoutingModule {} 