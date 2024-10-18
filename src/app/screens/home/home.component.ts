import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { AuthService } from '../../authentication/auth.service';
import { CardComponent } from '../../components/card/card.component';
import { IconComponent } from '../../components/icon/icon.component';
import { Card } from '../../model/Card';
import { UserRoles } from '../../model/UserRoles';
import { Usuario } from '../../model/Usuario';
import { LoaderService } from '../../service/loader.service';
import { MinimizeService } from '../../service/minimize.service';
import { TitleService } from '../../service/title.service';
import { HomeService } from './service/home.service';

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
export class HomeComponent implements OnInit {

  minimizedPages: MinimizedPage[] = [];
  menus: Menu[] = [];
  cards: Card[] = [];
  usuario!: Usuario;
  estacionamentos: any[] = [];

  constructor(
    private router: Router,
    private minimizeService: MinimizeService,
    private title: TitleService,
    private authService: AuthService,
    private homeService: HomeService,
    private loader: LoaderService,
  ) {
    title.setPageTitle("Home");
    const navigation = this.router.getCurrentNavigation();
    this.minimizedPages = this.minimizeService.getMinimizedPages();
  }

  ngOnInit(): void {
    this.iniciaHome();
  }

  async iniciaHome() {
    if (this.authService.isLoggedIn()) {
      await this.authService.fetchLoggedInUser();
      this.usuario = this.authService.getLoggedInUser();
      this.loadCards(this.usuario.role, this.usuario.id);
    }
  }

  loadEstacionamentos() {
    this.authService.getEstacionamentosByUsuarioId(this.usuario.id).subscribe({
      next: (estacionamentos) => {
        this.estacionamentos = estacionamentos;
      },
      error: (error) => {
        console.log('Erro ao buscar estacionamentos:', error);
      }
    });
  }

  loadCards(role: UserRoles, userId: number) {
    this.loader.show();
    this.homeService.getCardsByRole(role, userId).pipe(finalize(() => {
      this.loader.hide();
    })).subscribe({
      next: (cards) => {
        this.cards = cards;
      },
      error: (error) => {
        console.error('Error fetching cards:', error);
      }
    });
  }

  restaurarPagina(page: MinimizedPage): void {
    const restoredPage = this.minimizeService.restaurarPagina(page.route);
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
