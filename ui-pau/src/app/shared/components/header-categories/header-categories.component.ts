import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-header-categories',
  templateUrl: './header-categories.component.html',
  styleUrls: ['./header-categories.component.scss']
})
export class HeaderCategoriesComponent {
  @Input() titulo: string = '';
  @Input() descripcion: string = '';
} 