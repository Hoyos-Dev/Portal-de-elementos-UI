import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-all-loader',
  templateUrl: './all-loader.component.html',
  styleUrls: ['./all-loader.component.scss']
})
export class AllLoaderComponent implements OnInit, OnDestroy {

  @Input() mostrarHeader: boolean = true;
  isHidden: boolean = false;
  rotation = 0;
  progressValue = 0;
  private progressInterval: any;

  constructor(private router: Router) {}

  ngOnInit() {
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

  girar() {
    this.rotation += 90;
  }

  verCodigoLoader() {
    this.router.navigate(['loader/code-loader'], { queryParams: { from: this.router.url } });
  }

  verCodigoLoadingBar() {
    this.router.navigate(['loader/code-loading-bar'], { queryParams: { from: this.router.url } });
  }
}