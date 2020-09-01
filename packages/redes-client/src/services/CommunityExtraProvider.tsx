import React from "react";
import { useSession, useQuery, gql } from "bonde-core-tools";
import {
  CommunityExtraData,
  CommunityExtraVars,
  CommunityExtra,
} from "../types";

const initialValue = {
  settings: {
    distance: 0,
    volunteer_msg: "",
    individual_msg: "",
  },
};

const CommunityExtraContext = React.createContext<CommunityExtra>(initialValue);

const COMMUNITY_EXTRA = gql`
  query fetchCommunityExtra($communityId: bigint!, $context: Int!) {
    communitySettings: community_settings(
      where: { community_id: { _eq: $communityId } }
    ) {
      settings
    }
    communities(where: { id: { _eq: $context } }) {
      users: community_users {
        user {
          firstName: first_name
          lastName: last_name
          id
        }
      }
    }
  }
`;

const CommunityExtraProvider = ({
  children,
}: {
  children: any;
}): React.ReactElement => {
  const { community } = useSession();
  const variables = {
    communityId: (community && community.id) || 0,
    context: (community && community.id) || 0,
  };

  const { loading, error, data } = useQuery<
    CommunityExtraData,
    CommunityExtraVars
  >(COMMUNITY_EXTRA, { variables });

  if (loading) return <p>Loading...</p>;
  if (error) {
    console.log("error", error);
    return <p>Error</p>;
  }

  const settings =
    (data && data.communitySettings && data.communitySettings[0]) ||
    initialValue;

  const users =
    data && data.communities && data.communities[0] && data.communities[0];

  const value = users && settings ? { ...settings, ...users } : initialValue;

  return (
    <CommunityExtraContext.Provider value={value}>
      {children}
    </CommunityExtraContext.Provider>
  );
};

const useCommunityExtra = (): CommunityExtra => {
  const context = React.useContext(CommunityExtraContext);
  if (context === undefined) {
    throw new Error(
      "useCommunityExtra must be used within a CommunityExtraProvider"
    );
  }
  return context;
};

export { CommunityExtraProvider, useCommunityExtra };
