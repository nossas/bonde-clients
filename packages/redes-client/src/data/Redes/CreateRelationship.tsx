import { gql } from "bonde-core-tools";

export default gql`
  mutation createRelationship($recipientId: Int!, $volunteerId: Int!) {
    insert_rede_relationships(
      objects: {
        recipient_id: $recipientId
        volunteer_id: $volunteerId
        status: "encaminhamento_realizado"
      }
    ) {
      returning {
        created_at
        id
        recipient_id
        updated_at
        agent {
          id
        }
      }
    }

    update_rede_individuals(
      _set: { availability: "indisponível" }
      where: {
        _or: [{ id: { _eq: $volunteerId } }, { id: { _eq: $recipientId } }]
      }
    ) {
      returning {
        id
        email
        availability
      }
    }
  }
`;
