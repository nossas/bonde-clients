import React from 'react';
import { useQuery, gql } from 'bonde-core-tools';
import { Hint } from 'bonde-components';

const totalSubscriptionDonationsAmountQuery = gql`
  query (
    $community_id: Int!,
    $start_interval: timestamp!,
    $end_interval: timestamp!
  ) {
    totalSumSubscriptionDonationsFromCommunityInterval: donation_transactions_aggregate(
      where: {
        _and: [
          { community_id: { _eq: $community_id } },
          { payment_date: { _gte: $start_interval } },
          { payment_date: { _lte: $end_interval } },
          { subscription_id: { _is_null: false } },
          { transaction_status: { _eq: "paid" } }
        ]
      }
    ) {
      aggregate {
        count
      }
    }
  }
`;

type Props = {
  communityId: number
  children: any
}

const SubscriptionDonationsLastMonth: React.FC<Props> = ({ communityId, children }) => {
  const endInterval = new Date();
  const startInterval = new Date();
  startInterval.setDate(startInterval.getDate() - 30);
  
  const { data, loading, error } = useQuery(totalSubscriptionDonationsAmountQuery, {
    variables: {
      community_id: communityId,
      start_interval: startInterval.toISOString(),
      end_interval: endInterval.toISOString(),
    }
  });

  if (error) {
    console.log('error', { error });
    return (
      <Hint color='error'>{JSON.stringify(error)}</Hint>
    );
  }

  if (loading) return 'Carregando...';

  return children({ total: data.totalSumSubscriptionDonationsFromCommunityInterval.aggregate.count });
}

export default SubscriptionDonationsLastMonth;