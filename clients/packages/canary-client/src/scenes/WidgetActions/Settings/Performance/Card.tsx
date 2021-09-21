import React from "react";
import { Stack, Heading, Flex, Text } from "bonde-components";

type Props = {
  label: string
  value: number | string
}

const Card: React.FC<Props> = ({ label, value }) => (
  <Stack flex={1} spacing={2} maxW="204px" minH="103px">
    <Heading
      as="h5"
      size="xs"
      fontWeight="normal"
      color="gray.400"
      textTransform="uppercase">
      {label}
    </Heading>
    <Flex
      bg="white"
      boxShadow="sm"
      flex={1}
      px={6}
      py={2}
      align="end"
    >
      <Text
        fontSize="2xl"
        color="black"
        fontWeight="extrabold"
      >
        {value}
      </Text>
    </Flex>
  </Stack>
);

export default Card;
