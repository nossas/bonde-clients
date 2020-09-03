export interface CommunitySettings {
  settings: {
    volunteer_msg: string;
    individual_msg: string;
    distance: number;
  };
}

export type Groups = Array<{
  isVolunteer: boolean;
  name: string;
  communityId: number;
  id: number;
}>;

export interface CommunityExtraState extends CommunitySettings {
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
  communityId: number;
  context: number;
};

export type Form = {
  input: {
    distance: number;
    volunteer_msg: string;
    individual_msg: string;
  };
};
