import { gql } from "bonde-core-tools";

export default gql`
  mutation updateRedeGroup(
    $redeGroupId: Int_comparison_exp!
    $updatedGroup: rede_groups_set_input!
  ) {
    update_rede_groups(where: { id: $redeGroupId }, _set: $updatedGroup) {
      returning {
        id
        settings
        name
      }
    }
  }
`;
