export interface DataCenterInfoInterface {
    dataCenter: {
      name: string;
      online: number;
      totalExistente: number;
      descricao: string;
      status: string;
    };
    server: {
      name: string;
      descricao: string;
      online: number;
      total: number;
    };
    temperaturaCritica: {
      name: string;
      servidores: number;
      descricao: string;
    };
    temperaturaReal: {
      name: string;
      grausCelsius: number;
    };
  }