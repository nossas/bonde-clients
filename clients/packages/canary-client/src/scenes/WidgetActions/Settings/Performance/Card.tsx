import React from "react";
import {
  Stack,
  Heading,
  Flex,
  Text,
  Skeleton,
  Tooltip,
  InfoIcon
} from "bonde-components";

export interface CardProps {
  label?: string
  helpText?: string
  value?: number | string
  isLoading?: boolean
}

const Card: React.FC<CardProps> = ({ label, helpText, value, isLoading }) => (

  <Flex direction="column" flex={1} maxW="204px">
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
        <Tooltip label={helpText} maxW="220px" >
          <InfoIcon boxSize={6} color="gray.400" />
        </Tooltip>
      )}
    </Stack>
    <Skeleton isLoaded={!isLoading} startColor="gray.50" endColor="gray.100">
      <Flex
        bg="white"
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
    </Skeleton>
  </Flex>

);

export default Card;
