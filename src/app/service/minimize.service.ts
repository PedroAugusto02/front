import { Injectable } from '@angular/core';

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
  private minimizedPages: MinimizedPage[] = [];

  minimizePage(page: MinimizedPage): void {
    this.minimizedPages.push(page);
  }

  getMinimizedPages(): MinimizedPage[] {
    return this.minimizedPages;
  }

  restaurarPagina(route: string): MinimizedPage | undefined {
    const index = this.minimizedPages.findIndex(page => page.route === route);
    if (index !== -1) {
      const [restoredPage] = this.minimizedPages.splice(index, 1);
      return restoredPage;
    }
    return undefined;
  }
}
