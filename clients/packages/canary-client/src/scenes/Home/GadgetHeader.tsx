import React from "react";
import { Stack, Heading } from "bonde-components";

type Props = {
  title: string
  actionRightElement?: React.ReactElement
}

const GadgetHeader: React.FC<Props> = ({ title, actionRightElement }) => (
  <Stack
    direction="row"
    justifyContent="space-between"
    h={12}
    alignItems="flex-end"
    py={4}
  >
    <Heading fontFamily="Nunito Sans" as="h5" size="sm" textTransform="uppercase">{title}</Heading>
    {actionRightElement}
  </Stack>
);

export default GadgetHeader;