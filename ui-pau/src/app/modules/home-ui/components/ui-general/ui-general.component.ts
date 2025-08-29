import { Component, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Clipboard } from '@angular/cdk/clipboard';
import { MatSnackBar } from '@angular/material/snack-bar';
import { signal } from '@angular/core';

export interface Cargo {
  nombre: string;
  descripcion: string;
  estado: string;
}


const DATA: Cargo[] = [
  { nombre: 'Auxiliar', descripcion: 'Lorem ipsum dolor sit amet, consectetur', estado: 'Activo' },
  { nombre: 'Aprendiz', descripcion: 'Lorem ipsum dolor sit amet, consectetur', estado: 'Inactivo' },
  { nombre: 'Financiero Tesoreria', descripcion: 'Lorem ipsum dolor sit amet, consectetur', estado: 'Inactivo' },
  { nombre: 'Cajero Recaudos', descripcion: 'Lorem ipsum dolor sit amet, consectetur', estado: 'Activo' },
  { nombre: 'Auxiliar', descripcion: 'Lorem ipsum dolor sit amet, consectetur', estado: 'Activo' },
  { nombre: 'Aprendiz', descripcion: 'Lorem ipsum dolor sit amet, consectetur', estado: 'Inactivo' },
  { nombre: 'Financiero Tesoreria', descripcion: 'Lorem ipsum dolor sit amet, consectetur', estado: 'Inactivo' },
  { nombre: 'Auxiliar', descripcion: 'Lorem ipsum dolor sit amet, consectetur', estado: 'Activo' },
  { nombre: 'Aprendiz', descripcion: 'Lorem ipsum dolor sit amet, consectetur', estado: 'Inactivo' },
  { nombre: 'Financiero Tesoreria', descripcion: 'Lorem ipsum dolor sit amet, consectetur', estado: 'Inactivo' },
];

@Component({
  selector: 'app-ui-general',
  templateUrl: './ui-general.component.html',
  styleUrls: ['./ui-general.component.scss']
})
export class UiGeneralComponent implements AfterViewInit, OnDestroy {
  displayedColumns: string[] = ['nombre', 'descripcion', 'estado'];
  dataSource = new MatTableDataSource<Cargo>(DATA);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  isHidden: boolean = false;

  progressValue = 0;
  private progressInterval: any;

  radioValue: string = 'opcion1';

  constructor(private clipboard: Clipboard, private snackBar: MatSnackBar) {}

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.startProgressBar();
  }

  startProgressBar() {
    this.progressInterval = setInterval(() => {
      this.progressValue += 10;
      if (this.progressValue > 100) {
        this.progressValue = 0;
      }
    }, 800);
  }

  ngOnDestroy() {
    if (this.progressInterval) {
      clearInterval(this.progressInterval);
    }
  }

  rotation = 0;
  girar() {
    this.rotation += 90;
  }

  colorList = [
    { nombre: 'Azul primario', class: 'cuadro-azul-primario', hex: '#003594' },
    { nombre: 'Azul hover', class: 'cuadro-azul-secundario', hex: '#0047B3' },
    { nombre: 'Azul claro', class: 'cuadro-azul-claro', hex: '#e6f1fd' },
    { nombre: 'Amarillo', class: 'cuadro-amarillo', hex: '#FECA0A' },
    { nombre: 'Amarillo claro', class: 'cuadro-amarillo-claro', hex: '#FDF4D3' },
    { nombre: 'Gris Opcion 1', class: 'cuadro-gris-op1', hex: '#EBEBEB' },
    { nombre: 'Gris Opcion 2', class: 'cuadro-gris-op2', hex: '#475569' },
    { nombre: 'Gris Opcion 3', class: 'cuadro-gris-op3', hex: '#535353' },
    { nombre: 'Negro', class: 'cuadro-negro', hex: '#0F172A' },
    { nombre: 'Verde', class: 'cuadro-verde', hex: '#0ED422' },
    { nombre: 'Verde claro', class: 'cuadro-verde-claro', hex: '#effce0' },
    { nombre: 'Rojo', class: 'cuadro-rojo', hex: '#E91D24' },
    { nombre: 'Rojo claro', class: 'cuadro-rojo-claro', hex: '#ffe0e0' },
    { nombre: 'Naranja', class: 'cuadro-naranja', hex: '#FF9D00' },
    { nombre: 'Naranja claro', class: 'cuadro-naranja-claro', hex: '#fff3e0' },
  ];

  copiarColor(hex: string) {
    this.clipboard.copy(hex);
    this.snackBar.open('Color copiado: ' + hex, 'Cerrar', {
      duration: 1500,
      panelClass: ['snackbar-copiado']
    });
  }
  hide = signal(true);
  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }  
}

export class AllButtonsComponent {
  radioValue: string = 'opcion1';
} 




