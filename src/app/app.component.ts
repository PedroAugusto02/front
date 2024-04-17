import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { UsuarioComponent } from './usuario/usuario.component';
import { HttpClientModule } from '@angular/common/http';
import { SideNavComponent } from './side-nav/side-nav.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,UsuarioComponent,HttpClientModule,SideNavComponent,RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'front';
}
