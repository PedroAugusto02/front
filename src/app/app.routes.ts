import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login/login.component';
import { UsuarioComponent } from './pessoas/usuario/usuario.component';
import { EstacionamentoComponent } from './reservagas/estacionamento/estacionamento.component';
import { ReservaDetalhesComponent } from './reservagas/vaga/reserva-detalhes/reserva-detalhes.component';
import { VagaComponent } from './reservagas/vaga/vaga.component';
import { SideNavComponent } from './side-nav/side-nav.component';
import { VendedoresComponent } from './reservagas/vendedores/vendedores.component';
import { TabelaDePrecosComponent } from './reservagas/tabela-de-precos/tabela-de-precos.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { 
    path: '', 
    component: SideNavComponent, 
    canActivate: [AuthGuard],
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'usuarios', component: UsuarioComponent },
      { path: 'estacionamento', component: EstacionamentoComponent },
      { path: 'vagas', component: VagaComponent },
      { path: 'vendedores', component: VendedoresComponent},
      { path: 'reserva-detalhes', component: ReservaDetalhesComponent },
      { path: 'tabela-de-precos', component: TabelaDePrecosComponent},
      { path: '', redirectTo: 'home', pathMatch: 'full' }
    ]
  },
  { path: '**', redirectTo: '/login', pathMatch: 'full' }
];
