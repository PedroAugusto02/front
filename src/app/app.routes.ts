import { Routes } from '@angular/router';
import { UsuarioComponent } from './usuario/usuario.component';
import { SideNavComponent } from './side-nav/side-nav.component';
import { HomeComponent } from './home/home.component';
import { AtividadesComponent } from './atividades/atividades.component';
import { JobsComponent } from './jobs/jobs.component';
import { EstacionamentoComponent } from './reservagas/estacionamento/estacionamento.component';

export const routes: Routes = [
    { path: 'usuarios', component: UsuarioComponent },
    { path: '', component: HomeComponent },
    { path: 'home', component: HomeComponent},
    { path: 'atividades', component: AtividadesComponent},
    { path: 'trabalhos', component: JobsComponent},
    { path: 'estacionamento', component: EstacionamentoComponent},
];
