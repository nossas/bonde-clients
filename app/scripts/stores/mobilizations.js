import { EDIT_COLUMN_CONTENT } from '../constants/ActionTypes';

const initialState = [
  {
    name: "Bicicletada contra a redução da maioridade penal",
    id: 1,
    pages: [{
      blocks: [{
        uuid: "ffxx1122A2",
        columns: [{
          hash: "xyz1",
          size: 12,
          type: "content",
          content: "col-12"
        }]
      },{
        uuid: "21398712983712",
        columns: [{
          hash: "xyz2",
          size: 6,
          type: "content",
          content: "col-6"
        },{
          hash: "xyz3",
          size: 6,
          type: "content",
          content: "col-6"
        }]
      },{
        uuid: "aldkashdkajs",
        columns: [{
          hash: "xyz4",
          size: 4,
          type: "content",
          content: "col-4"
        },{
          hash: "xyz5",
          size: 4,
          type: "content",
          content: "col-4"
        },{
          hash: "xyz6",
          size: 4,
          type: "content",
          content: "col-4"
        }]
      }]
    }]
  }
]

export default function mobilizations(state = initialState, action) {
  switch (action.type) {
    case EDIT_COLUMN_CONTENT:
      var mobilization = state.filter(function(m){
        return m.id == action.mobilizationId
      })[0];

      var block = mobilization.pages[0].blocks.filter(function(b){
        return b.uuid == action.blockId
      })[0];

      var column = block.columns.filter(function(c){
        return c.hash == action.columnHash
      })[0];

      column.content = action.text

      return state
    default:
      return state
  }
}
