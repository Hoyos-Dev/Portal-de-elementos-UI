import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-orchestrator',
  templateUrl: './orchestrator.component.html',
  styleUrls: ['./orchestrator.component.scss']
})
export class OrchestratorComponent implements OnInit {
  

  // Variables para controlar qué componentes se muestran
  showHeadUi: boolean = true;
  showCategoriesUi: boolean = true;
  showOtherComponent: boolean = false;

  constructor() { }

  ngOnInit(): void {
    // Lógica de inicialización del orchestrator
    this.initializeComponents();
  }

  /**
   * Inicializa los componentes que se deben mostrar
   */
  private initializeComponents(): void {
    // Por defecto, mostrar el head-ui y categories-ui
    this.showHeadUi = true;
    this.showCategoriesUi = true;
    
    // Aquí puedes agregar lógica condicional para mostrar otros componentes
    // this.showOtherComponent = this.checkSomeCondition();
  }

  /**
   * Método para cambiar dinámicamente qué componentes se muestran
   */
  public toggleComponent(componentName: string): void {
    switch(componentName) {
      case 'head-ui':
        this.showHeadUi = !this.showHeadUi;
        break;
      case 'categories-ui':
        this.showCategoriesUi = !this.showCategoriesUi;
        break;
      case 'other':
        this.showOtherComponent = !this.showOtherComponent;
        break;
    }
  }
}
