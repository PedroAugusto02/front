import { Component, ComponentFactoryResolver, Inject, PLATFORM_ID, Renderer2 } from '@angular/core';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { UsuarioComponent } from '../usuario/usuario.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatMenuModule } from '@angular/material/menu';
import { ActivatedRoute, NavigationEnd, RouterLink, RouterModule } from '@angular/router';
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
    private router: Router,
    private renderer: Renderer2,
    private minimize: MinimizeService,
    private route: ActivatedRoute,
    private componentFactoryResolver: ComponentFactoryResolver,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  ngOnInit(): void {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']);
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

  minimizePage(): void {
    // Cria um objeto para a página minimizada
    const minimizedPage = {
      name: this.pageTitle,
      icon: this.getIconForCurrentPage(),
      component: this.getCurrentComponent(),
      data: this.getCurrentPageData()
    };

    // Adiciona a página minimizada ao serviço
    this.minimize.minimizedPages.push(minimizedPage);

    // Adiciona a classe 'minimized' ao body para aplicar a animação
    document.body.classList.add('minimized');

    // Navega para a página inicial
    this.router.navigate(['/home']);
}

  getCurrentComponent(): any {
    const routeSnapshot = this.route.snapshot;
    const component = routeSnapshot.component;
    return component;
  }

  getCurrentPageData(): any {
    const routeSnapshot = this.route.snapshot;
    const data = routeSnapshot.data;
    return data;
  }

  getIconForCurrentPage(): string {
    // Retorna o ícone correspondente à página atual
    return this.menus.flatMap(menu => menu.submenus).find(submenu => submenu.link === this.router.url)?.icon || 'help';
  }


}
