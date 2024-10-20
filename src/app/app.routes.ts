import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { HomeComponent } from './screens/home/home.component';
import { LoginComponent } from './screens/login/login/login.component';
import { UsuarioComponent } from './screens/pessoas/usuario/usuario.component';
import { UsuariosComponent } from './screens/pessoas/usuarios/usuarios.component';
import { PrimeiroEstacionamentoComponent } from './screens/primeiro-estacionamento/primeiro-estacionamento.component';
import { EstacionamentoComponent } from './screens/reservagas/screens/estacionamento/estacionamento.component';
import { TabelaDePrecosComponent } from './screens/reservagas/screens/tabela-de-precos/tabela-de-precos.component';
import { ReservaDetalhesComponent } from './screens/reservagas/screens/vaga/reserva-detalhes/reserva-detalhes.component';
import { VagaComponent } from './screens/reservagas/screens/vaga/vaga.component';
import { VendedoresComponent } from './screens/reservagas/screens/vendedores/vendedores.component';
import { ResetPasswordComponent } from './screens/reset-password/reset-password.component';
import { SideNavComponent } from './screens/side-nav/side-nav.component';

export const routes: Routes = [

  { path: 'login', component: LoginComponent },
  { path: 'reset-password', component: ResetPasswordComponent },
  { path: 'primeiro-estacionamento', component: PrimeiroEstacionamentoComponent },
  {
    path: '', component: SideNavComponent, 
    canActivate: [AuthGuard],
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'usuario', component: UsuarioComponent },
      { path: 'usuarios', component: UsuariosComponent },
      { path: 'estacionamento', component: EstacionamentoComponent },
      { path: 'vagas', component: VagaComponent },
      { path: 'vendedores', component: VendedoresComponent },
      { path: 'reserva-detalhes', component: ReservaDetalhesComponent },
      { path: 'tabela-de-precos', component: TabelaDePrecosComponent },
      { path: '', redirectTo: 'home', pathMatch: 'full' }
    ]
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login', pathMatch: 'full' }
];
