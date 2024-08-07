import { Component, OnInit } from '@angular/core';
import { TitleService } from '../service/title.service';
import { CardComponent } from '../components/card/card.component';
import { IconComponent } from '../components/icon/icon.component';
import { MatIcon } from '@angular/material/icon';
import { MinimizeService } from '../service/minimize.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../authentication/auth.service';

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
export class HomeComponent implements OnInit{

  minimizedPages: MinimizedPage[] = [];
  menus: Menu[] = []; // Adicione esta linha para inicializar menus
  usuario: any;
  estacionamentos: any[] = [];

  constructor(
    private router: Router,
    private minimizeService: MinimizeService,
    private title: TitleService,
    private authService: AuthService,
  ) {
    title.setPageTitle("Home");
    const navigation = this.router.getCurrentNavigation();
    this.minimizedPages = this.minimizeService.getMinimizedPages();
  }

  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      this.authService.fetchLoggedInUser();
      this.usuario = this.authService.getLoggedInUser();
      if (this.usuario && this.usuario.role === 'DONO') {

      }
    }
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
