import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-all-icons',
  templateUrl: './all-icons.component.html',
  styleUrls: ['./all-icons.component.scss']
})
export class AllIconsComponent {
  @Input() mostrarHeader: boolean = true;

  constructor(private router: Router) {}

  verCodigoIcons() {
    this.router.navigate(['icons/code-icons'], { queryParams: { from: this.router.url } });
  }
} 