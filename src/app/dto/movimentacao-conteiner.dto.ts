export interface MovimentacaoConteinerDTO {
  id: number;
  tipoMovimentacao: string;
  dataHoraInicio: string;
  dataHoraFim: string;
  conteiner: {
    id: number;
    codigoConteiner: string;
  }

}
