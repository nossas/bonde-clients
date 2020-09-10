import React from "react";
import styled from "styled-components";
import { useSession } from "bonde-core-tools";
import { Empty } from "bonde-components";
import { useCommunityExtra } from "../services/CommunityExtraProvider";
import { Groups } from "../types";

const WrapEmpty = styled.div`
  height: 100%;
  & > div {
    height: 100%;
  }
`;

type ComponentProps = {
  community: {
    id: number;
  };
  groups: Groups;
  timestamp: string;
};

export default function CheckCommunity({
  Component,
  ...props
}: {
  Component: ({
    community,
    groups,
    timestamp,
  }: ComponentProps) => React.ReactElement;
}): React.ReactElement {
  const { community } = useSession();
  const { groups } = useCommunityExtra();
  const today = new Date();
  // get last week and format
  const lastWeek = new Date().setDate(today.getDate() - 7);
  // format lastWeek timestamp
  const timestamp = new Date(lastWeek).toISOString();
  return community ? (
    <Component
      community={community}
      groups={groups}
      timestamp={timestamp}
      {...props}
    />
  ) : (
    <WrapEmpty>
      <Empty message="Selecione uma comunidade" />
    </WrapEmpty>
  );
}

CheckCommunity.displayName = "CheckCommunity";
