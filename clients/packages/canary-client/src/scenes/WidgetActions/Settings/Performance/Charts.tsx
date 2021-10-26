import React from "react";
import { ResponsiveContainer, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
import { Flex, Heading, Text, Stack } from "bonde-components";
import { useQuery, gql } from "bonde-core-tools";

const ACTIVIST_PRESSURES_RANGE_QUERY = gql`
  query ($widget_id: Int, $start_date: timestamp, $end_date: timestamp) {
    activist_pressures_range(
      where: {
        widget_id: { _eq: $widget_id },
        _and: [
          { created_at: { _gte: $start_date } },
          { created_at: { _lte: $end_date } },
        ]
      }
    ) {
      created_at
      total
    }
  }
`;

export interface ChartsProps {
  widgetId: number
  start: string
  end: string
} 

const Charts: React.FC<ChartsProps> = ({ widgetId, start, end }) => {
  const { data, loading, error } = useQuery(ACTIVIST_PRESSURES_RANGE_QUERY, {
    variables: {
      widget_id: widgetId,
      start_date: start,
      end_date: end
    }
  });
  
  if (loading) return <Text>Loading</Text>;
  if (error) return <Text>Error!</Text>;

  const diffInMs = (new Date(end) as any) - (new Date(start) as any);
  const diffInDays = diffInMs / (1000 * 60 * 60 * 24);

  const newItems = Array.from({ length: diffInDays + 1 }, (_, index) => {
    const i = new Date(start);
    i.setDate(i.getDate() + index);
    const exist = data.activist_pressures_range.filter((a: any) => new Date(a.created_at).toDateString() === i.toDateString())[0]
    
    return {
      name: i.getDate(),
      total: exist ? exist.total : 0
    }
  })

  return (
    <div style={{ width: "100%", height: "275px" }}>
      <ResponsiveContainer>
        <LineChart data={newItems}>
          <Line type="monotone" dataKey="total" stroke="#9AE3D3" />
          <CartesianGrid stroke="#EEEEEE" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

const ChartsWrap: React.FC<Pick<ChartsProps, 'widgetId'>> = ({ widgetId }) => {
  const now = new Date();

  const before = new Date();
  before.setDate(before.getDate() - 29);

  return (
    <Flex direction="column" flex={1}>
      <Stack direction="row" spacing={1} minH={6} alignItems="center">
        <Heading
          as="h5"
          size="xs"
          fontWeight="normal"
          color="gray.400"
          textTransform="uppercase"
        >
          Progresso da campanha
        </Heading>
      </Stack>
      <Stack bg="white" boxShadow="sm" p={6}>
        <Flex justify="space-between">
          <Stack spacing={2} pl={5}>
            <Heading size="lg" fontWeight="extrabold">Pressões enviadas</Heading>
            <Text fontSize="sm">{before.toLocaleDateString()} a {now.toLocaleDateString()}</Text>
          </Stack>
          <Text fontSize="sm">Últimos 30 dias</Text>
        </Flex>
        <Charts
          widgetId={widgetId}
          start={before.toDateString()}
          end={now.toDateString()}
        />
      </Stack>
    </Flex>
  );
};

export default ChartsWrap;