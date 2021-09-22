import React from "react";
import {
  Stack,
  Heading,
  Flex,
  Text,
  Tooltip,
  InfoIcon
} from "bonde-components";

type Props = {
  label: string
  helpText?: string
  value: number | string
}

const Card: React.FC<Props> = ({ label, helpText, value }) => (
  <Flex direction="column" flex={1} maxW="204px" minH="123px">
    <Stack direction="row" spacing={2} minH={6}>
      <Heading
        as="h5"
        size="xs"
        fontWeight="normal"
        color="gray.400"
        textTransform="uppercase">
        {label}
      </Heading>
      {helpText && (
        <Tooltip label={helpText} maxW="220px">
          <InfoIcon boxSize={6} />
        </Tooltip>
      )}
    </Stack>
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
  </Flex>
);

export default Card;
