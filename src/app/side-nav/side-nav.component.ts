import { Component } from '@angular/core';
import {MatButton, MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import {UsuarioComponent } from '../usuario/usuario.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatMenuModule} from '@angular/material/menu';
import { RouterLink, RouterModule } from '@angular/router';



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
  UsuarioComponent],
  templateUrl: './side-nav.component.html',
  styleUrl: './side-nav.component.css'
})
export class SideNavComponent {
  showFiller = false;
}