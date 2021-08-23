import React from "react";
import { useQuery, useSession } from "bonde-core-tools";
import { SimpleGrid } from "bonde-components";
import { useTranslation } from "react-i18next";
import MobilizationCard, { Mobilization } from "./MobilizationCard";
import mobilizationsLastUpdated from "./query.graphql";
import LoadingCards from "./Loading";
import GadgetHeader from "../GadgetHeader";

const MobilizationsGadget = (): React.ReactElement => {
  const { t } = useTranslation("home");
  const { user, storage, communities } = useSession();
  const { data, loading } = useQuery(mobilizationsLastUpdated, {
    variables: { userId: user.id },
  });

  if (loading) return <LoadingCards />;

  const parse = (m: any): Mobilization => ({
    id: m.id,
    name: m.name,
    goal: m.goal,
    facebookShareImage: m.facebook_share_image,
    customDomain: m.custom_domain,
    slug: m.slug,
    community: m.community,
  });

  const { mobilizations } = data;

  return (
    <>
      <GadgetHeader title={t("gadgets.mobilizations.title")} />
      <SimpleGrid columns={[1, null, 2]} spacing={6}>
        {mobilizations.map(parse).map((mobilization: Mobilization) => (
          <MobilizationCard
            key={mobilization.id}
            mobilization={mobilization}
            onClick={() => {
              if (process.env.REACT_APP_DOMAIN_ADMIN) {
                const community = communities.filter(
                  (c: any) => c.id === mobilization.community.id
                )[0];
                storage.setAsyncItem("community", community).then(() => {
                  window.location.href = new URL(
                    `/${mobilization.id}/edit`,
                    process.env.REACT_APP_DOMAIN_ADMIN
                  ).href;
                });
              }
            }}
          />
        ))}
      </SimpleGrid>
    </>
  );
};

export default MobilizationsGadget;
