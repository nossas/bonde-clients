import * as types from '../constants/ActionTypes'

export function editColumnContent(mobilizationId, blockId, columnHash, text) {
  return {
    type: types.EDIT_COLUMN_CONTENT,
    mobilizationId,
    blockId,
    columnHash,
    text
  };
}
