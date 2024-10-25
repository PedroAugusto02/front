
export interface ViaCep {
    cep: string;
    logradouro: string;
    complemento?: string;
    bairro: string;
    localidade: string; // Cidade
    uf: string;         // Estado (sigla)
    estado: string;     // Nome completo do estado (se disponível)
    regiao?: string;    // Região (se disponível)
    ibge: string;
    gia?: string;
    ddd: string;
    siafi: string;
  }
  