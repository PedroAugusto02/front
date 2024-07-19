import { Routes } from '@angular/router';
import { UsuarioComponent } from './usuario/usuario.component';
import { SideNavComponent } from './side-nav/side-nav.component';
import { HomeComponent } from './home/home.component';
import { AtividadesComponent } from './atividades/atividades.component';
import { JobsComponent } from './jobs/jobs.component';
import { EstacionamentoComponent } from './reservagas/estacionamento/estacionamento.component';
import { VagaComponent } from './reservagas/vaga/vaga.component';
import { ReservaDetalhesComponent } from './reservagas/vaga/reserva-detalhes/reserva-detalhes.component';
import { LoginComponent } from './login/login/login.component';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { 
    path: '', 
    component: SideNavComponent, 
    canActivate: [AuthGuard],
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'usuarios', component: UsuarioComponent },
      { path: 'atividades', component: AtividadesComponent },
      { path: 'trabalhos', component: JobsComponent },
      { path: 'estacionamento', component: EstacionamentoComponent },
      { path: 'vagas', component: VagaComponent },
      { path: 'reserva-detalhes', component: ReservaDetalhesComponent },
      { path: '', redirectTo: 'home', pathMatch: 'full' }
    ]
  },
  { path: '**', redirectTo: '/login', pathMatch: 'full' }
];
