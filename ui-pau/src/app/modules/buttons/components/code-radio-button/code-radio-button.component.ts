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
  selector: 'app-code-radio-button',
  templateUrl: './code-radio-button.component.html',
  styleUrls: ['./code-radio-button.component.scss']
})
export class CodeRadioButtonComponent implements AfterViewInit {
  //@ViewChild('codeBlock') codeBlock!: ElementRef;
  radioValue: string = 'opcion1';
  from: string = '';
  tabs: any[] = [];
  selectedTab: 'html' | 'ts' = 'html';
  tsIcon: string = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0,0,256,285" width="20px" height="20px" fill-rule="nonzero"><g fill="#fbfbfb" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><g transform="scale(5.12,5.12)"><path d="M5,4c-0.55226,0.00006 -0.99994,0.44774 -1,1v40c0.00006,0.55226 0.44774,0.99994 1,1h40c0.55226,-0.00006 0.99994,-0.44774 1,-1v-40c-0.00006,-0.55226 -0.44774,-0.99994 -1,-1zM6,6h38v38h-38zM15,23v3.44531h5v15.55469h4v-15.55469h5v-3.44531zM36.69141,23.00977c-3.11462,-0.0124 -6.67383,0.93145 -6.67383,5.31445c0,5.73 7.7207,5.73141 7.7207,8.31641c0,0.245 0.10391,2.02539 -2.62109,2.02539c-2.725,0 -4.99609,-1.71289 -4.99609,-1.71289v4.1582c0,0 11.88086,3.84273 11.88086,-4.82227c-0.001,-5.625 -7.79297,-5.34367 -7.79297,-8.13867c0,-1.083 0.76939,-2.0957 2.90039,-2.0957c2.131,0 4.01758,1.25781 4.01758,1.25781l0.14063,-3.70508c0,0 -2.15369,-0.58801 -4.57617,-0.59766z"/></g></g></svg>`;
  htmlIcon: string = `<svg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='0,0,256,280' width='20px' height='20px' fill-rule='nonzero'><g fill='#ffffff' fill-rule='nonzero' stroke='none' stroke-width='1' stroke-linecap='butt' stroke-linejoin='miter' stroke-miterlimit='10' stroke-dasharray='' stroke-dashoffset='0' font-family='none' font-weight='none' font-size='none' text-anchor='none' style='mix-blend-mode: normal'><g transform='scale(5.12,5.12)'><path d='M45.27344,2.32422c-0.1875,-0.20703 -0.45703,-0.32422 -0.73828,-0.32422h-39.07031c-0.28125,0 -0.55078,0.11719 -0.73828,0.32422c-0.19141,0.20703 -0.28516,0.48438 -0.25781,0.76563l3.51953,39.42578c0.03516,0.41406 0.32422,0.75781 0.72266,0.875l16.01172,4.57031c0.08594,0.02734 0.17969,0.03906 0.27344,0.03906c0.09375,0 0.18359,-0.01172 0.27344,-0.03906l16.02344,-4.57031c0.39844,-0.11719 0.68359,-0.46094 0.72266,-0.875l3.51563,-39.42578c0.02734,-0.28125 -0.06641,-0.55859 -0.25781,-0.76562zM36.84766,15.91797h-18.8125l0.44922,5.08984h17.91016l-1.34375,15.04297l-10.05859,3.03906l-0.09766,-0.03125l-9.94141,-3.01172l-0.54297,-6.12891h4.87109l0.21094,2.37891l5.55859,1.16406l5.45703,-1.16406l0.58203,-6.4375h-17.04297l-1.32422,-14.80469h24.55859z'/></g></g></svg>`;

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
    this.codeService.getExample('code-radio-button').subscribe(data => {
      this.tabs = [
        { label: 'HTML', code: data.html, language: 'html', icon: data.icons.html },
        { label: 'TypeScript', code: data.ts, language: 'ts', icon: data.icons.ts }
      ];
      this.cdr.detectChanges();
    });
  }

  setTab(tab: 'html' | 'ts') {
    this.selectedTab = tab;
    this.cdr.detectChanges();
    setTimeout(() => Prism.highlightAll(), 0);
  }

  copiarCodigo() {
    const tab = this.tabs.find(t => t.label.toLowerCase() === this.selectedTab);
    if (tab) {
      this.clipboard.copy(tab.code);
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
