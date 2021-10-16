import React from "react";
import { Stack, Heading } from "@chakra-ui/react";

export interface GadgetHeaderProps {
  title: string
  actionLeftElement?: React.ReactElement
  actionRightElement?: React.ReactElement
}

export const GadgetHeader: React.FC<GadgetHeaderProps> = ({
  title,
  actionLeftElement,
  actionRightElement
}) => {
  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      h={12}
      minH={12}
      maxH={12}
      alignItems="flex-end"
    >
      {actionLeftElement}
      <Heading
        as="h5"
        size="xs"
        color="gray.300"
        textTransform="uppercase"
      >
        {title}
      </Heading>
      {actionRightElement}
    </Stack>
  );
}

export interface GadgetProps {
  h?: string
}

export const Gadget: React.FC<GadgetProps> = ({
  children,
  h = "606px"
}) => (
  <Stack flex={1} spacing={4} h={h} minH={h}>
    {children}
  </Stack>
);