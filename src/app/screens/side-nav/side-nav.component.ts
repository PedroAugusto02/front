import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ChangeDetectorRef, Component, Inject, PLATFORM_ID, Renderer2 } from '@angular/core';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ActivatedRoute, NavigationEnd, Router, RouterLink, RouterModule } from '@angular/router';
import { filter } from 'rxjs';
import { AuthService } from '../../authentication/auth.service';
import { ToggleDarkThemeComponent } from '../../components/inputs/toggle-dark-theme/toggle-dark-theme.component';
import { LoaderCircularComponent } from '../../components/loader-circular/loader-circular.component';
import { LoaderService } from '../../service/loader.service';
import { MenuService } from '../../service/menu.service';
import { MinimizableStateService } from '../../service/minimizable-state.service';
import { MinimizeService } from '../../service/minimize.service';
import { TitleService } from '../../service/title.service';
import { UsuariosComponent } from '../pessoas/usuario/usuarios.component';
import { Menu } from './interfaces/model';

@Component({
  selector: 'app-side-nav',
  standalone: true,
  imports: [
    MatSidenavModule,
    MatButtonModule,
    UsuariosComponent,
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
    CommonModule,
    ToggleDarkThemeComponent,
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
  menus: Menu[] = [];

  constructor(
    private titleService: TitleService,
    private loader: LoaderService,
    private authService: AuthService,
    private menuService: MenuService,
    private renderer: Renderer2,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private minimizeService: MinimizeService,
    private minimizableStateService: MinimizableStateService,
    private changeDetectorRef: ChangeDetectorRef,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  ngOnInit(): void {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']);
    } else {
      this.isHomePage = this.router.url === '/home';
      this.menuService.loadUserMenus();
    }

    this.menuService.getUserMenus().subscribe(menus => {
      this.menus = menus;
    });

    this.titleService.getPageTitle().subscribe((title: string) => {
      this.pageTitle = title;
      this.changeDetectorRef.detectChanges();
    });

    this.router.events.pipe(filter(event => event instanceof NavigationEnd)
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
    this.minimizableStateService.triggerMinimizeEvent('UsuarioComponent');
    const currentState = this.getCurrentPageState();
    console.log('Estado atual:', currentState);

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

  getCurrentPageState(): any {
    return this.minimizableStateService.getComponentState('UsuarioComponent');
  }

  getIconForCurrentPage(): string {
    return this.menus.flatMap(menu => menu.submenus).find(submenu => submenu.link === this.router.url)?.icon || 'help';
  }

  toggleSidenav(drawer: any) {
    drawer.toggle();
    this.sidenavIcon = drawer.opened ? 'close' : 'menu'; // Atualiza o ícone com base no estado
  }

}
