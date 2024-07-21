import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

interface MinimizedPage {
  name: string;
  icon: string;
  route: string;
  state: any;
}

@Injectable({
  providedIn: 'root'
})
export class MinimizeService {
  public minimizedPages: MinimizedPage[] = [];

  constructor(private router: Router) { }

  minimizePage(page: any, state: any) {
    const minimizedPage: MinimizedPage = {
      name: page.name,
      icon: page.icon,
      route: page.route,
      state: state
    };
    this.minimizedPages.push(minimizedPage);
  }

  restorePage(page: MinimizedPage) {
    const index = this.minimizedPages.indexOf(page);
    if (index !== -1) {
      this.minimizedPages.splice(index, 1);
    }
  }

  getMinimizedPages() {
    return this.minimizedPages;
  }
}
