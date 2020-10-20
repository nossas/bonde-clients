import { gql } from "bonde-core-tools";

export default gql`
  mutation createRelationship(
    $tickets: [solidarity_tickets_insert_input!]!
    $match: solidarity_matches_insert_input!
  ) {
    insert_solidarity_tickets(
      objects: $tickets
      on_conflict: {
        constraint: solidarity_tickets_ticket_id_key
        update_columns: [
          status
          assignee_id
          custom_fields
          tags
          updated_at
          link_match
          data_encaminhamento
          nome_voluntaria
          status_acolhimento
          match_syncronized
        ]
      }
    ) {
      returning {
        ticket_id
      }
    }
    insert_solidarity_matches_one(
      object: $match
      on_conflict: {
        constraint: solidarity_matches_individuals_ticket_id_volunteers_ticket__key
        update_columns: [
          created_at
          community_id
          individuals_user_id
          volunteers_user_id
          volunteers_ticket_id
          status
        ]
      }
    ) {
      id
    }
  }
`;
