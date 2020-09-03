export type MapaIndividual = {
  id: number;
  individual: {
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
  };
  status: string;
  createdAt: string;
  updatedAt: string;
  organizationId: number;
};

export type MapaGroupsData = {
  data: MapaIndividual[];
  count: {
    aggregate: {
      count: number;
    };
  };
};

export type GroupsVars = {
  rows: number;
  offset: number;
  order_by?: string;
  status: { _eq: string | number | undefined };
  state: { _eq: string | number | undefined };
  availability: { _eq: string | number | undefined };
  individualId: { _eq: number };
  query: string;
};

export type Individual = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  whatsapp: string;
  phone: string;
  zipcode: string;
  address: string;
  city: string;
  coordinates: Record<string, string>;
  state: string;
  status: string;
  availability: string;
  extras: Record<string, string>;
  form_entry_id: number;
  group: {
    id: number;
    community_id: number;
    is_volunteer: boolean;
  };
  created_at: string;
  updated_at: string;
};

export interface GroupsData {
  individuals: Individual[];
  individuals_count: {
    aggregate: {
      count: number;
    };
  };
  volunteers: Individual[];
  volunteers_count: {
    aggregate: {
      count: number;
    };
  };
}
