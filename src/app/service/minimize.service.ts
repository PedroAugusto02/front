import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

interface MinimizedPage {
  name: string;
  icon: string;
  component: any;
  data: any;
}

@Injectable({
  providedIn: 'root'
})
export class MinimizeService {
  public minimizedPages: any[] = [];

  constructor(private router: Router) { }

  minimizePage(page: any) {
    this.minimizedPages.push(page);
  }

  restorePage(page: any) {
    const index = this.minimizedPages.indexOf(page);
    if (index !== -1) {
      this.minimizedPages.splice(index, 1);
    }
  }

  getMinimizedPages() {
    return this.minimizedPages;
  }
}
