import { Component } from '@angular/core';
import { TitleService } from '../service/title.service';
import { CardComponent } from '../components/card/card.component';
import { IconComponent } from '../components/icon/icon.component';
import { MatIcon } from '@angular/material/icon';
import { MinimizeService } from '../service/minimize.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

interface SubMenu {
  link: string;
  icon: string;
}

interface Menu {
  submenus: SubMenu[];
}

interface MinimizedPage {
  name: string;
  icon: string;
  route: string; // Altere para armazenar a rota
  state: any; // Armazena o estado da página, como filtros
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CardComponent, IconComponent, MatIcon, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  minimizedPages: MinimizedPage[] = [];
  menus: Menu[] = []; // Adicione esta linha para inicializar menus

  constructor(
    private router: Router,
    private minimizeService: MinimizeService,
    private title: TitleService,
  ) {
    title.setPageTitle("Home");
    const navigation = this.router.getCurrentNavigation();
    this.minimizedPages = this.minimizeService.getMinimizedPages();
  }

  restorePage(page: MinimizedPage): void {
    const restoredPage = this.minimizeService.restorePage(page.route);
    if (restoredPage) {
      this.router.navigate([restoredPage.route], { state: { data: restoredPage.state } });
    }
  }



  getMinimizedPages(): any[] {
    return this.minimizeService.getMinimizedPages();
  }

  getIconForCurrentPage(): string {
    return this.menus.flatMap((menu: Menu) => menu.submenus)
      .find((submenu: SubMenu) => submenu.link === this.router.url)?.icon || 'help';
  }

  getCurrentComponent(): string {
    return this.router.url;
  }

  getCurrentPageData(): any {
    return history.state.data;
  }

}
