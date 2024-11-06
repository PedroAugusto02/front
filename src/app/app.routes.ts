import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { HomeComponent } from './screens/home/home.component';

import { PrimeiroEstacionamentoComponent } from './screens/primeiro-estacionamento/primeiro-estacionamento.component';

import { TabelaDePrecosComponent } from './screens/reservagas/screens/tabela-de-precos/tabela-de-precos.component';
import { ReservaDetalhesComponent } from './screens/reservagas/screens/vaga/reserva-detalhes/reserva-detalhes.component';
import { VagaComponent } from './screens/reservagas/screens/vaga/vaga.component';
import { VendedoresComponent } from './screens/reservagas/screens/vendedores/vendedores.component';
import { ResetPasswordComponent } from './screens/reset-password/reset-password.component';
import { SideNavComponent } from './screens/side-nav/side-nav.component';
import { ContratosComponent } from './screens/reservagas/screens/contratos/contratos.component';
import { ContratosDetalhesComponent } from './screens/reservagas/screens/contratos/contratos-detalhes/contratos-detalhes.component';
import { UsuarioComponent } from './screens/usuario/usuario/usuario.component';
import { UsuariosComponent } from './screens/admin/usuarios/usuarios.component';
import { EstacionamentoComponent } from './screens/admin/estacionamento/estacionamento.component';
import { LoginComponent } from './screens/login/login.component';

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
      { path: 'contratos', component: ContratosComponent },
      { path: 'contratos/detalhes', component: ContratosDetalhesComponent },
      { path: '', redirectTo: 'home', pathMatch: 'full' }
    ]
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login', pathMatch: 'full' }
];
