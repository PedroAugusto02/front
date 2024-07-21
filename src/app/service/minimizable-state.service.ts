import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MinimizableStateService {
  private componentStates = new Map<string, any>();
  private minimizeEvent = new Subject<string>();

  setComponentState(key: string, state: any): void {
    this.componentStates.set(key, state);
  }

  getComponentState(key: string): any {
    return this.componentStates.get(key);
  }

  getMinimizeEvent() {
    return this.minimizeEvent.asObservable();
  }

  triggerMinimizeEvent(componentName: string): void {
    this.minimizeEvent.next(componentName);
  }

  // Método para limpar o estado de um componente
  clearComponentState(componentName: string): void {
    this.componentStates.delete(componentName);
  }
}
