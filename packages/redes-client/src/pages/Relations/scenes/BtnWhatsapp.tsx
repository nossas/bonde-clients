import React from "react";

import { Icon, Theme as theme } from "bonde-components";
import { whatsappLink } from "../../../services/utils";
import { css } from "styled-components/macro";
import { Individual } from "../../../types";

const BtnWhatsapp = ({
  original,
}: {
  original: { volunteer: Individual; recipient: Individual };
}): React.ReactElement => {
  const matchGroups = [original.volunteer.group, original.recipient.group]
  return (
    <div
      css={css`
        display: grid;
        grid-template-columns: auto auto;
        justify-content: center;
        width: 100%;
        grid-gap: 20px;
        align-items: center;
        height: 100%;
      `}
    >
      <Icon name="Whatsapp" size="small" color={theme.brand.main} />
      <div style={{ display: "grid" }}>
        {matchGroups.map((group, i) => {
          const individual = group?.isVolunteer ? "volunteer" : "recipient";
          return (
            <a
              href={whatsappLink(
                original[individual]?.whatsapp ||
                  original[individual]?.phone ||
                  "",
                ""
              )}
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: "none" }}
              key={`whatsapp-link-${i}`}
              css={css`
                color: ${theme.brand.main};
              `}
            >
              {group?.name}
            </a>
          );
        })}
      </div>
    </div>
  )
}

export default BtnWhatsapp;
