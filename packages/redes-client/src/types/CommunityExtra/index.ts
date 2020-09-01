export type CommunityExtra = {
  settings: {
    volunteer_msg: string;
    individual_msg: string;
    distance: number;
  };
  users?: {
    user: {
      firstName: string;
      lastName: string;
      id: number;
    };
  }[];
};

export interface CommunityExtraData {
  communitySettings: CommunityExtra[];
  communities: Array<{
    users: Array<{
      user: {
        firstName: string;
        lastName: string;
        id: number;
      };
    }>;
  }>;
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
