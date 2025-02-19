import { NextApiRequest, NextApiResponse } from 'next'
import { client } from '../../../apis/graphql';
import { gql } from '@apollo/client';

const signaturesQuery = gql`
query {
  plips_aggregate(where: {widget_id: {_eq: 70801}, status: {_in: ["PENDENTE", "INSCRITO"]}}) {
    aggregate {
      sum {
        expected_signatures
      }
    }
  }
  plip_signatures_aggregate(where: {widget_id: {_eq: 70801}}) {
     aggregate {
      sum {
         confirmed_signatures
      }
     }
   }
}
`

const activistsQuery = gql`
query {
  plips_aggregate(distinct_on: unique_identifier, where: {widget_id: {_eq: 70801}, created_at: {_gt: "2022-05-11"}}) {
    aggregate {
      count(columns: id, distinct: true)
    }
  }
}
`

export default async function fetchSignatures(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  const { method } = req;
  if (method === "GET") {
    const signaturesTotal = await client.query({
      query: signaturesQuery,
      fetchPolicy: "no-cache"
    })
    const activistsTotal = await client.query({
      query: activistsQuery,
      fetchPolicy: "no-cache"
    })
    return res.status(200).json({
      data: {
        signaturesTotal,
        activistsTotal
      }
    })
  }
}
