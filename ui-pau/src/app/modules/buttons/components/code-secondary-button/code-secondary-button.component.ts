import { Component, AfterViewInit, ElementRef, ViewChild, ChangeDetectorRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Clipboard } from '@angular/cdk/clipboard';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as Prism from 'prismjs';
import 'prismjs/components/prism-scss';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-markup'; // para HTML
import { CodeExample } from 'src/app/core/models/code-example.model';
import { CodeExampleService } from 'src/app/core/services/code-example.service';

@Component({
  selector: 'app-code-secondary-buttons',
  templateUrl: './code-secondary-button.component.html',
  styleUrls: ['./code-secondary-button.component.scss']
})
export class CodeSecondaryButtonsComponent implements AfterViewInit {
  @ViewChild('codeBlock') codeBlock!: ElementRef;
  from: string = '';
  tabs: any[] = [];
  selectedTab: 'html' | 'scss' = 'html';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private clipboard: Clipboard,
    private snackBar: MatSnackBar,
    private cdr: ChangeDetectorRef,
    private codeService: CodeExampleService
  ) {
    this.route.queryParams.subscribe(params => {
      this.from = params['from'] || '/';
    });
    this.codeService.getExample('code-secondary-button').subscribe(data => {
      this.tabs = [
        { label: 'HTML', code: data.html, language: 'html', icon: data.icons.html },
        { label: 'SCSS', code: data.scss, language: 'scss', icon: data.icons.scss }
      ];
      this.cdr.detectChanges();
    });
  }

  setTab(tab: 'html' | 'scss') {
    this.selectedTab = tab;
    this.cdr.detectChanges();
    setTimeout(() => Prism.highlightAll(), 0);
  }

  copiarCodigo() {
    const tab = this.tabs.find(t => t.label.toLowerCase() === this.selectedTab);
    if (tab) {
      this.clipboard.copy(tab.code.replace(/\n/g, '\n').replace(/\"/g, '"'));
      this.snackBar.open('Código copiado', 'Cerrar', {
        duration: 1500,
        panelClass: ['snackbar-copiado']
      });
    }
  }

  volver() {
    if (this.from === '/' || this.from === '') {
      this.router.navigate(['']); // all
    } else if (this.from.includes('botones')) {
      this.router.navigate(['botones']);
    } else if (this.from.includes('colores')) {
      this.router.navigate(['colores']);
    } else if (this.from.includes('alertas')) {
      this.router.navigate(['alertas']);
    } else if (this.from.includes('tablas')) {
      this.router.navigate(['tablas']);
    } else if (this.from.includes('inputs')) {
      this.router.navigate(['inputs']);
    } else if (this.from.includes('icons')) {
      this.router.navigate(['icons']);
    } else if (this.from.includes('loader')) {
      this.router.navigate(['loader']);
    } else if (this.from.includes('cards')) {
      this.router.navigate(['cards']);
    } else if (this.from.includes('extras')) {
      this.router.navigate(['extras']);
    } else if (this.from.includes('typography')) {
      this.router.navigate(['typography']);
    } else if (this.from.includes('images')) {
      this.router.navigate(['images']);
    } else {
      this.router.navigate(['']); // fallback
    }
  }

  ngAfterViewInit() {
    Prism.highlightAll();
  }
}
