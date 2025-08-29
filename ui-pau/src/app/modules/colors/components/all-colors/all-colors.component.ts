import { Component, Input } from '@angular/core';
import { Clipboard } from '@angular/cdk/clipboard';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-all-colors',
  templateUrl: './all-colors.component.html',
  styleUrls: ['./all-colors.component.scss']
})
export class AllColorsComponent {
  @Input() mostrarHeader: boolean = true;
  colors = [
    { name: 'Azul primario', hex: '#003594' },
    { name: 'Azul hover', hex: '#0047B3' },
    { name: 'Azul claro', hex: '#e6f1fd' },
    { name: 'Amarillo', hex: '#FECA0A' },
    { name: 'Amarillo claro', hex: '#FDF4D3' },
    { name: 'Gris Opcion 1', hex: '#EBEBEB' },
    { name: 'Gris Opcion 2', hex: '#475569' },
    { name: 'Gris Opcion 3', hex: '#535353' },
    { name: 'Negro', hex: '#0F172A' },
    { name: 'Verde', hex: '#0ED422' },
    { name: 'Verde claro', hex: '#effce0' },
    { name: 'Rojo', hex: '#E91D24' },
    { name: 'Rojo claro', hex: '#ffe0e0' },
    { name: 'Naranja', hex: '#FF9D00' },
    { name: 'Naranja claro', hex: '#fff3e0' },
  ];

  constructor(private clipboard: Clipboard, private snackBar: MatSnackBar) {}

  copiarHex(hex: string) {
    this.clipboard.copy(hex);
    this.snackBar.open('Color copiado: ' + hex, 'Cerrar', {
      duration: 1500,
      panelClass: ['snackbar-copiado']
    });
  }
} 