import { Component, OnInit } from '@angular/core';
import { TitleService } from '../service/title.service';
import { CardComponent } from '../components/card/card.component';
import { IconComponent } from '../components/icon/icon.component';
import { MatIcon } from '@angular/material/icon';
import { MinimizeService } from '../service/minimize.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../authentication/auth.service';
import { UsuarioService } from '../pessoas/usuario/service/usuario.service';
import { Card } from '../entity/Card';
import { HomeService } from './service/home.service';
import { Usuario } from '../entity/Usuario';
import { UserRoles } from '../entity/UserRoles';

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
  cards: Card[] = [];
  usuario!: Usuario;
  estacionamentos: any[] = [];

  constructor(
    private router: Router,
    private minimizeService: MinimizeService,
    private title: TitleService,
    private authService: AuthService,
    private homeService: HomeService,
  ) {
    title.setPageTitle("Home");
    const navigation = this.router.getCurrentNavigation();
    this.minimizedPages = this.minimizeService.getMinimizedPages();
  }

  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      this.authService.fetchLoggedInUser();
      this.usuario = this.authService.getLoggedInUser();
  
      if (this.usuario) {
        this.loadCards(this.usuario.role, this.usuario.id);
      }
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
    if (!role) {
      console.error('Role is undefined');
      return;
    }
  
    this.homeService.getCardsByRole(role, userId).subscribe(cards => {
      this.cards = cards;
    }, error => {
      console.error('Error fetching cards:', error);
    });
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
