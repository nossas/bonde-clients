import React from "react";
import { Flex, Heading, Stack, Text } from "bonde-components";
import TargetsStatistics from "./TargetsStatistics";
import { Widget } from "../../FetchWidgets";

const CARDS_LABELS = [
  "Pressões",
  "Alvos",
  "Envios totais",
  "Entregues",
  "SPAM",
  "Falha"
]

type Props = {
  widget: Widget
}

const PerformanceScene: React.FC<Props> = ({ widget }) => {

  return (
    <Stack spacing={6} mt={4}>
      <Stack direction="row" spacing={4}>
        {CARDS_LABELS.map((label: string, index: number) => (
          <Stack key={`card-item-${index}`} flex={1} spacing={2} maxW="204px" minH="103px">
            <Heading as="h5" size="sm" color="gray.300" textTransform="uppercase">
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
              <Text fontSize="2xl" fontWeight="extrabold">{Math.round(Math.random() * 100000)}</Text>
            </Flex>
          </Stack>
        ))}
      </Stack>
      <TargetsStatistics widgetId={widget.id} />
    </Stack>
  );
}

export default PerformanceScene;