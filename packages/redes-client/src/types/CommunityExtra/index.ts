export interface CommunitySettings {
  settings: {
    volunteer_msg: string;
    individual_msg: string;
  };
}

export type Groups = Array<{
  isVolunteer: boolean;
  name: string;
  communityId: number;
  id: number;
  widgetId: number;
  settings: {
    communication?: {
      whatsapp?: string;
    };
  };
}>;

export interface CommunityExtraState {
  users?: Array<{
    user: {
      firstName: string;
      lastName: string;
      id: number;
    };
  }>;
  groups: Groups;
}

export interface CommunityExtraData {
  communitySettings: CommunitySettings[];
  community: Array<{
    users: Array<{
      user: {
        firstName: string;
        lastName: string;
        id: number;
      };
    }>;
  }>;
  groups?: Groups;
}

export type CommunityExtraVars = {
  context: { _eq: number };
};

export type Form = {
  input: {
    volunteer_msg: string;
    individual_msg: string;
  };
};
