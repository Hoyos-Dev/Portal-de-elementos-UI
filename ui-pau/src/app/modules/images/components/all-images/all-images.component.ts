import { Component, Input } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-all-images',
  templateUrl: './all-images.component.html',
  styleUrls: ['./all-images.component.scss']
})
export class AllImagesComponent {
  @Input() mostrarHeader: boolean = true;
  constructor(private snackBar: MatSnackBar) {}

  descargarImagen(ruta: string, nombre: string) {
    const link = document.createElement('a');
    link.href = ruta;
    link.download = nombre;
    link.click();
    this.snackBar.open('Imagen descargada correctamente', 'Cerrar', {
      duration: 1500,
      panelClass: ['snackbar-copiado']
    });
  }
} 