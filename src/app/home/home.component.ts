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
  data: any;
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
  ) {
    const navigation = this.router.getCurrentNavigation();
    this.minimizedPages = this.minimizeService.getMinimizedPages();
  }

  restorePage(page: any): void {
    // Remove a aba minimizada da lista
    this.minimizeService.minimizedPages = this.minimizeService.minimizedPages.filter(p => p !== page);

    // Navega para a rota armazenada na página minimizada
    this.router.navigate([page.route], { state: { data: page.data } });
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
