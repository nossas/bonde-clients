import React, { useState } from "react";
import { useSession } from "bonde-core-tools";
import { useTranslation } from "react-i18next";
import { isMobile } from "react-device-detect";

import SearchInput from "../../../components/SearchInput";
import CommunitiesScrollBox from "./CommunitiesScrollBox";
import GadgetHeader from "../GadgetHeader";

const CommunitiesGadget = (): React.ReactElement => {
  const { t } = useTranslation("home");
  const { communities } = useSession();
  const [data, setData] = useState(communities);

  return (
    <>
      <GadgetHeader
        title={!isMobile ? t("gadgets.communities.title") : undefined}
        actionRightElement={(
          <SearchInput
            placeholder={t("gadgets.communities.search")}
            field="name"
            data={communities}
            onChange={setData}
          />
        )}
      />
      <CommunitiesScrollBox communities={data} />
    </>
  );
};

export default CommunitiesGadget;
