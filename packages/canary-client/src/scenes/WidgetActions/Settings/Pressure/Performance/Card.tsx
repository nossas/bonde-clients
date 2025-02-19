import React from "react";
import { InfoIcon } from 'bonde-components/icons';
import {
  Stack,
  Heading,
  Flex,
  Text,
  Tooltip
} from "bonde-components/chakra";

export interface CardProps {
  label?: string
  helpText?: string
  value?: number | string
  isLoading?: boolean
}

export const CardHeader: React.FC<any> = ({ label, helpText }) => (
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
)

const Card: React.FC<CardProps> = ({ label, helpText, value }) => (
  <Flex direction="column" flex={1} maxW="204px">
    <CardHeader label={label} helpText={helpText} />
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
        color="black"
        fontWeight="extrabold"
        fontSize="4xl"
      >
        {value}
      </Text>
    </Flex>
  </Flex>
);

export default Card;
