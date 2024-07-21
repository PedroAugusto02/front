import { Component, ComponentFactoryResolver, Inject, PLATFORM_ID, Renderer2 } from '@angular/core';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatMenuModule } from '@angular/material/menu';
import { ActivatedRoute, ActivatedRouteSnapshot, NavigationEnd, RouterLink, RouterModule, RouterStateSnapshot } from '@angular/router';
import { TitleService } from '../service/title.service';
import { LoaderCircularComponent } from '../components/loader-circular/loader-circular.component';
import { Router } from '@angular/router';
import { filter } from 'rxjs';
import { LoaderService } from '../service/loader.service';
import { MatExpansionModule } from '@angular/material/expansion';
import { Menu } from './interfaces/model';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ToggleDarkThemeComponent } from '../components/inputs/toggle-dark-theme/toggle-dark-theme.component';
import { AuthService } from '../authentication/auth.service';
import { MinimizeService } from '../service/minimize.service';
import { UsuarioComponent } from '../pessoas/usuario/usuario.component';

@Component({
  selector: 'app-side-nav',
  standalone: true,
  imports: [
    MatSidenavModule,
    MatButtonModule,
    UsuarioComponent,
    MatButton,
    MatToolbarModule,
    MatListModule,
    MatIconModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatMenuModule,
    RouterLink,
    RouterModule,
    LoaderCircularComponent,
    MatExpansionModule,
    UsuarioComponent,
    CommonModule,
    ToggleDarkThemeComponent
  ],
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css'],
  providers: [TitleService]
})
export class SideNavComponent {
  showFiller = false;
  pageTitle: string = '';
  isDarkTheme = false;
  isHomePage = false;
  filters: any;
  state: any;
  sidenavIcon: string = 'menu'; // ícone padrão
  
  menus: Menu[] = [
    {
      title: 'Pessoas',
      submenus: [
        { title: 'Usuario', link: '/usuarios', icon: "person" },
        { title: 'Trabalho', link: '/trabalhos', icon: "work" },
        // { title: 'Atividades', link: '/atividades', icon: "extension" },
      ],
      expanded: false
    },
    {
      title: 'Reservagas',
      submenus: [
        { title: 'Estacionamento', link: '/estacionamento', icon: "directions_car" },
        { title: 'Vagas', link: '/vagas', icon: "local_parking" },
        { title: 'Vendedores', link: '/vendedores', icon: "person_pin_circle" }
      ],
      expanded: false
    }
  ];

  constructor(
    private titleService: TitleService,
    private loader: LoaderService,
    private authService: AuthService,
    private renderer: Renderer2,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private minimizeService: MinimizeService,
    private componentFactoryResolver: ComponentFactoryResolver,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  ngOnInit(): void {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']);
    } else {
      this.isHomePage = this.router.url === '/home';
    }

    this.titleService.getPageTitle().subscribe((title: string) => {
      this.pageTitle = title;
    });

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.loader.reset();
      this.isHomePage = this.router.url === '/home';
    });

    if (isPlatformBrowser(this.platformId)) {
      this.setTheme();
    }
  }

  setTheme(): void {
    const currentTheme = localStorage.getItem('theme') || 'light-theme';
    this.renderer.addClass(document.body, currentTheme);
  }

  logout() {
    this.authService.logout();
  }

  closePage() {
    this.router.navigate(['/home']);
  }

  minimizePage(): void {
    const currentRoute = this.activatedRoute.snapshot.root;
    const currentState = this.getCurrentPageState(currentRoute);

    const minimizedPage = {
      name: this.pageTitle,
      icon: this.getIconForCurrentPage(),
      route: this.router.url,
      state: currentState
    };

    this.minimizeService.minimizePage(minimizedPage);

    document.body.classList.add('minimized');
    this.router.navigate(['/home']);
  }

  getCurrentPageState(route: ActivatedRouteSnapshot): any {
    let state: any = {};

    // Recorrer para encontrar o componente ativo
    while (route.firstChild) {
      route = route.firstChild;
    }

    const component = route.component;

    if (component && (component as any).prototype && (component as any).prototype.getMinimizeState) {
      const routeData = route.data;
      if (routeData) {
        const instance = routeData['instance'];
        if (instance && instance.prototype.getMinimizeState()) {
          state = instance.prototype.getMinimizeState();
        }
      }
    }

    return state;
  }


  getIconForCurrentPage(): string {
    return this.menus.flatMap(menu => menu.submenus).find(submenu => submenu.link === this.router.url)?.icon || 'help';
  }

  toggleSidenav(drawer: any) {
    drawer.toggle();
    this.sidenavIcon = drawer.opened ? 'close' : 'menu'; // Atualiza o ícone com base no estado
  }

}
