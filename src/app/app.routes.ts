import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { LoginComponent } from './screens/login/login/login.component';
import { ResetPasswordComponent } from './screens/reset-password/reset-password.component';
import { SideNavComponent } from './screens/side-nav/side-nav.component';
import { HomeComponent } from './screens/home/home.component';
import { UsuariosComponent } from './screens/pessoas/usuario/usuarios.component';
import { EstacionamentoComponent } from './screens/reservagas/estacionamento/estacionamento.component';
import { VagaComponent } from './screens/reservagas/vaga/vaga.component';
import { VendedoresComponent } from './screens/reservagas/vendedores/vendedores.component';
import { ReservaDetalhesComponent } from './screens/reservagas/vaga/reserva-detalhes/reserva-detalhes.component';
import { TabelaDePrecosComponent } from './screens/reservagas/tabela-de-precos/tabela-de-precos.component';
import { PrimeiroEstacionamentoComponent } from './screens/primeiro-estacionamento/primeiro-estacionamento.component';


export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'reset-password', component: ResetPasswordComponent },
  { path: 'primeiro-estacionamento', component: PrimeiroEstacionamentoComponent},
  { 
    path: '', component: SideNavComponent, 
    canActivate: [AuthGuard],
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'usuarios', component: UsuariosComponent },
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
