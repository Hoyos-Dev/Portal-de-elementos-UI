import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-categories-ui',
  templateUrl: './categories-ui.component.html',
  styleUrls: ['./categories-ui.component.scss']
})
export class CategoriesUiComponent {
  constructor(public router: Router) {}

  isActive(route: string): boolean {
    // Si la ruta es vacía, es el home
    if (route === '' && this.router.url === '/') return true;
    // Para rutas normales
    return this.router.url.includes(route) && route !== '';
  }

  irAAll() {
    this.router.navigate(['']);
  }

  irABotones() {
    this.router.navigate(['botones']);
  }

  irAColores() {
    this.router.navigate(['colores']);
  }

  irAAlertas() {
    this.router.navigate(['alertas']);
  }

  irATablas() {
    this.router.navigate(['tablas']);
  }

  irAInputs() {
    this.router.navigate(['inputs']);
  }

  irAIcons() {
    this.router.navigate(['icons']);
  }

  irALoader() {
    this.router.navigate(['loader']);
  }

  irACards() {
    this.router.navigate(['cards']);
  }

  irAExtras() {
    this.router.navigate(['extras']);
  }

  irATypography() {
    this.router.navigate(['typography']);
  }

  irAImages() {
    this.router.navigate(['images']);
  }
}
