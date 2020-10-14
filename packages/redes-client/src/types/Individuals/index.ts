export type MapaIndividual = {
  id: number;
  firstName: string;
  email: string;
  whatsapp: string;
  phone: string;
  zipcode: string;
  address: string;
  city: string;
  latitude: string;
  longitude: string;
  state: string;
  availability: string;
  formEntryId: string;
  tipoDeAcolhimento: string | null;
  createdAt: string;
  encaminhamentosRealizados: string;
  atendimentosConcluidos: string;
  atendimentosEmAndamento: string;
  organizationId: number;
  updatedAt: string;
};

export type MapaIndividualTicket = {
  individual: MapaIndividual;
  id: number;
  subject: string;
  relationshipStatus: string;
  userStatus: string;
};

export type Individual = {
  id: number;
  firstName: string;
  lastName?: string;
  email: string;
  whatsapp: string;
  phone: string;
  zipcode: string;
  address: string;
  city: string;
  coordinates: {
    latitude: string;
    longitude: string;
  };
  state: string;
  availability: string;
  formEntryId: string;
  tipoDeAcolhimento?: string | null;
  createdAt: string;
  encaminhamentosRealizados?: string;
  atendimentosConcluidos?: string;
  atendimentosEmAndamento?: string;
  userStatus: string;
  updatedAt: string;
  organizationId?: number;
  subject?: string;
  group?: {
    isVolunteer: boolean;
  };
};

export type MapaGroupsData = {
  data: MapaIndividual[];
  individualsCount: {
    aggregate: {
      count: number;
    };
  };
};

export type RedesGroupsData = {
  data: Individual[];
  individualsCount: {
    aggregate: {
      count: number;
    };
  };
};

export type MapaGroupsVars = {
  rows: number;
  offset: number;
  order_by?: string;
  userStatus: { _eq: string | number | undefined };
  relationshipStatus: { _eq: string | number | undefined };
  state: { _eq: string | number | undefined };
  availability: { _eq: string | number | undefined };
  individualId: { _eq: number };
  query: string;
};

export type RedesGroupsVars = {
  rows: number;
  offset: number;
  order_by?: string;
  userStatus: { _eq: string | number | undefined };
  state: { _eq: string | number | undefined };
  availability: { _eq: string | number | undefined };
  redeGroupId: { _eq: number };
  query: string;
};
