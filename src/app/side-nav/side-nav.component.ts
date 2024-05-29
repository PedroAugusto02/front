import { Component } from '@angular/core';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { UsuarioComponent } from '../usuario/usuario.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatMenuModule } from '@angular/material/menu';
import { NavigationEnd, RouterLink, RouterModule } from '@angular/router';
import { TitleService } from '../service/title.service';
import { LoaderCircularComponent } from '../components/loader-circular/loader-circular.component';
import { Router } from '@angular/router';
import { filter } from 'rxjs';
import { LoaderService } from '../service/loader.service';
import { MatExpansionModule } from '@angular/material/expansion';
import { Menu } from './interfaces/model';
import { CommonModule } from '@angular/common';

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
  ],
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css'],
  providers: [TitleService]
})
export class SideNavComponent {
  showFiller = false;
  pageTitle: string = '';
  menus: Menu[] = [
    {
      title: 'Mais Opções',
      submenus: [
        { title: 'Usuario', link: '/usuarios' ,icon: "icon-person"},
        // { title: 'Opção 1.2', link: '/opcao2' }
      ],
      expanded: false
    },
    {
      title: 'Outras Opções',
      submenus: [
        // { title: 'Opção 2.1', link: '/opcao3' },
        // { title: 'Opção 2.2', link: '/opcao4' }
      ],
      expanded: false
    }
  ];

  constructor(
    private titleService: TitleService,
    private loader: LoaderService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.titleService.getPageTitle().subscribe((title: string) => {
      this.pageTitle = title;
    });

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.loader.reset();
    });
  }


}
