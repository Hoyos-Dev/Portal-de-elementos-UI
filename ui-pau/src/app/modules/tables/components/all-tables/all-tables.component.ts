import { Component, OnInit, ViewChild, AfterViewInit, Input } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';

@Component({
  selector: 'app-all-tables',
  templateUrl: './all-tables.component.html',
  styleUrls: ['./all-tables.component.scss']
})
export class AllTablesComponent implements OnInit, AfterViewInit {
  @Input() mostrarHeader: boolean = true;
  dataSource = new MatTableDataSource<any>([
    { nombre: 'Auxiliar', descripcion: 'Lorem ipsum dolor sit amet, consectetur', estado: 'Activo' },
    { nombre: 'Aprendiz', descripcion: 'Lorem ipsum dolor sit amet, consectetur', estado: 'Inactivo' },
    { nombre: 'Financiero Tesoreria', descripcion: 'Lorem ipsum dolor sit amet, consectetur', estado: 'Inactivo' },
    { nombre: 'Cajero Recaudos', descripcion: 'Lorem ipsum dolor sit amet, consectetur', estado: 'Activo' },
    { nombre: 'Auxiliar', descripcion: 'Lorem ipsum dolor sit amet, consectetur', estado: 'Activo' },
    { nombre: 'Aprendiz', descripcion: 'Lorem ipsum dolor sit amet, consectetur', estado: 'Inactivo' },
    { nombre: 'Financiero Tesoreria', descripcion: 'Lorem ipsum dolor sit amet, consectetur', estado: 'Inactivo' },
    { nombre: 'Auxiliar', descripcion: 'Lorem ipsum dolor sit amet, consectetur', estado: 'Activo' },
    { nombre: 'Aprendiz', descripcion: 'Lorem ipsum dolor sit amet, consectetur', estado: 'Inactivo' },
    { nombre: 'Financiero Tesoreria', descripcion: 'Lorem ipsum dolor sit amet, consectetur', estado: 'Inactivo' }
  ]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  displayedColumns: string[] = ['nombre', 'descripcion', 'estado'];

  constructor(private router: Router) {}

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  verCodigoTabla() {
    this.router.navigate(['tablas/code-table'], { queryParams: { from: this.router.url } });
  }

  verCodigoDetalle() {
    this.router.navigate(['tablas/code-details'], { queryParams: { from: this.router.url } });
  }

  ngOnInit(): void {}
} 