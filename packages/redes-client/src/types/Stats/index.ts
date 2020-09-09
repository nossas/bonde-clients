export type WeeklyStatsData = {
  newRecipients: {
    aggregate: {
      count: number;
    };
  };
  encaminhamentosRealizados: {
    aggregate: {
      count: number;
    };
  };
  encaminhamentosServicoPublico: {
    aggregate: {
      count: number;
    };
  };
  atendimentosIniciados: {
    aggregate: {
      count: number;
    };
  };
  newlyApprovedVolunteers: {
    aggregate: {
      count: number;
    };
  };
  newlyAvailableVolunteers: {
    aggregate: {
      count: number;
    };
  };
};

export type WeeklyStatsVars = {
  individualOrganizationId: number;
  lastWeek: { _gte: string };
  context: { _eq: number };
};

export type GeneralStatsVars = {
  individualOrganizationId: number;
};

export type GeneralStatsData = {
  encaminhamentosRealizados: {
    aggregate: {
      count: number;
    };
  };
  atendimentosIniciados: {
    aggregate: {
      count: number;
    };
  };
  atendimentosConcluidos: {
    aggregate: {
      count: number;
    };
  };
  atendimentosInterrompidos: {
    aggregate: {
      count: number;
    };
  };
  aprovadas: {
    aggregate: {
      count: number;
    };
  };
  reprovadasEstudoDeCaso: {
    aggregate: {
      count: number;
    };
  };
  reprovadasDiretrizes: {
    aggregate: {
      count: number;
    };
  };
};
