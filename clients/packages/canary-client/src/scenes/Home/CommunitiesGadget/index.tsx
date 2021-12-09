import React, { useState } from "react";
import { useSession } from "bonde-core-tools";
import { useTranslation } from "react-i18next";

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
        title={t("gadgets.communities.title")}
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
