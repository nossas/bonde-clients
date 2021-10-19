import React from "react";
import {
  Stack,
  Heading,
  Flex,
  Text,
  Tooltip,
  InfoIcon
} from "bonde-components";

export interface CardProps {
  label?: string
  helpText?: string
  value?: number | string
  isLoading?: boolean
}

const Card: React.FC<CardProps> = ({ label, helpText, value }) => (
  <Flex direction="column" flex={1} maxW="204px">
    <Stack direction="row" spacing={1} minH={6} alignItems="center">
      <Heading
        as="h5"
        size="xs"
        fontWeight="normal"
        color="gray.400"
        textTransform="uppercase">
        {label}
      </Heading>
      {helpText && (
        <Tooltip label={helpText} maxW="220px" backgroundColor="gray.400">
          <InfoIcon boxSize={4} color="gray.400" />
        </Tooltip>
      )}
    </Stack>

    <Flex
      bg="white"
      borderRadius="4px"
      boxShadow="sm"
      flex={1}
      px={6}
      py={2}
      align="end"
      minH="131px"
      minW="175px"
    >
      <Text
        fontSize="3xl"
        color="black"
        fontWeight="extrabold"
      >
        {value}
      </Text>
    </Flex>
  </Flex>
);

export default Card;
