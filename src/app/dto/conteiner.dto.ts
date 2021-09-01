export interface ConteinerDTO {
  id: number;
  cliente: string;
  codigoConteiner: string;
  tipoConteiner: string;
  status: string;
  categoria: string;


  // poderia colocar as movimentações de conteiner amarradas
  // mas neste caso não é necessário
  //
  // movimentacoesConteiner: {
  //   id: number;
  //   tipoMovimentacao: string;
  // }

}
