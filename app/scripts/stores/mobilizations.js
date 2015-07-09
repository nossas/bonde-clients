const initialState = [
  {
    name: "Bicicletada contra a redução da maioridade penal",
    pages: [{
      blocks: [{
        uuid: "ffxx1122A2",
        columns: [{
          size: 12,
          type: "content",
          content: "col-12"
        }]
      },{
        uuid: "21398712983712",
        columns: [{
          size: 6,
          type: "content",
          content: "col-6"
        },{
          size: 6,
          type: "content",
          content: "col-6"
        }]
      },{
        uuid: "aldkashdkajs",
        columns: [{
          size: 4,
          type: "content",
          content: "col-4"
        },{
          size: 4,
          type: "content",
          content: "col-4"
        },{
          size: 4,
          type: "content",
          content: "col-4"
        }]
      }]
    }]
  }
]

export default function mobilization(state = initialState, action) {
  switch (action.type) {
    default:
      return state
  }
}
