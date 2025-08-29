import { Component, Input, ChangeDetectorRef, AfterViewInit, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { MatSnackBar } from '@angular/material/snack-bar';

export interface ViewSintaxisTab {
  label: string;
  code: string;
  language: string;
  icon?: string; // SVG string opcional
  safeIcon?: SafeHtml; // SVG saneado
}

@Component({
  selector: 'app-view-sintaxis',
  templateUrl: './view-sintaxis.component.html',
  styleUrls: ['./view-sintaxis.component.scss']
})
export class ViewSintaxisComponent implements AfterViewInit, OnInit {
  private _tabs: ViewSintaxisTab[] = [
    { label: 'HTML', code: 'hola soy html', language: 'html' },
    { label: 'SCSS', code: 'hola soy scss', language: 'scss' }
  ];
  @Input() set tabs(value: ViewSintaxisTab[]) {
    this._tabs = value;
    console.log('tabs recibidos en view-sintaxis:', this._tabs);
    this.sanitizeIcons();
  }
  get tabs(): ViewSintaxisTab[] {
    return this._tabs;
  }

  selectedTabIndex: number = 0;

  constructor(
    private cdr: ChangeDetectorRef,
    private sanitizer: DomSanitizer,
    private snackBar: MatSnackBar
  ) {
    this.sanitizeIcons();
  }

  ngOnInit() {
    this.sanitizeIcons();
  }

  ngAfterViewInit() {
    this.highlight();
  }

  sanitizeIcons() {
    this.tabs.forEach(tab => {
      if (tab.icon) {
        tab.safeIcon = this.sanitizer.bypassSecurityTrustHtml(tab.icon);
      }
    });
  }

  setTab(index: number) {
    this.selectedTabIndex = index;
    this.cdr.detectChanges();
    setTimeout(() => this.highlight(), 0);
  }

  highlight() {
    if ((window as any).Prism) {
      (window as any).Prism.highlightAll();
    }
  }

  copiarCodigo() {
    const code = this.tabs[this.selectedTabIndex]?.code || '';
    navigator.clipboard.writeText(code);
    this.snackBar.open('Código copiado', 'Cerrar', {
      duration: 1500,
      panelClass: ['snackbar-copiado']
    });
  }
} 