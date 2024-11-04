import { Component } from '@angular/core';
import { InputNumberValorComponent } from '../../../../../components/inputs/text/input-number-valor/input-number-valor.component';
import { DatePickerComponent } from '../../../../../components/inputs/date-picker-ui/date-picker.component';
import { InputNumberComponent } from '../../../../../components/inputs/text/input-number/input-number.component';
import { InputEmailComponent } from '../../../../../components/inputs/text/input-email/input-email.component';
import { InputTelefoneComponent } from '../../../../../components/inputs/text/input-telefone/input-telefone.component';
import { InputSelectComponent } from '../../../../../components/inputs/inputselect/inputselect.component';
import { ButtonComponent } from '../../../../../components/buttons/button/button.component';
import { InputtextComponent } from '../../../../../components/inputs/text/inputtext/inputtext.component';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { TitleService } from '../../../../../service/title.service';

@Component({
  selector: 'app-contratos-detalhes',
  standalone: true,
  imports: [
    MatButton,
    MatButtonModule,
    MatIconModule,
    MatIcon,
    InputtextComponent,
    ButtonComponent,
    InputSelectComponent,
    InputTelefoneComponent,
    InputEmailComponent,
    InputNumberComponent,
    DatePickerComponent,
    InputNumberValorComponent
  ],
  templateUrl: './contratos-detalhes.component.html',
  styleUrl: './contratos-detalhes.component.css'
})
export class ContratosDetalhesComponent {

  constructor(
    private titleService: TitleService,
  )
  {
    this.titleService.setPageTitle("Contratos Detalhes");  
  }

  contrato = {
    clienteNome: '',
    clienteCpf: '',
    contato: '',
    placaCarro: '',
    dataInicio: new Date(),
    dataFim: null,
    metodoCobranca: '',
    valor: 0,
    vagaId: null,
  };

  metodosCobranca = [
    { id: 'MENSAL', nome: 'Mensal' },
    { id: 'DIARIO', nome: 'Diário' },
    { id: 'ANUAL', nome: 'Anual' },
  ];

  vagasDisponiveis = []; // Exemplo de lista de vagas obtida do backend

  onSaveContrato() {
    // Lógica para salvar o contrato
    console.log('Contrato salvo', this.contrato);
  }

}
