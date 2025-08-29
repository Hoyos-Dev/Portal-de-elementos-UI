import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-all-typography',
  templateUrl: './all-typography.component.html',
  styleUrls: ['./all-typography.component.scss']
})
export class AllTypographyComponent {
  @Input() mostrarHeader: boolean = true;
} 