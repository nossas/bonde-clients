import { Entity } from 'draft-js'


const getSelectionEntities = (editorState, entityType) => {
  // Selection cursor
  const targetSelection = editorState.getSelection()
  const endOffset = targetSelection.getEndOffset()

  const currentContent = editorState.getCurrentContent()

  const block = currentContent.getBlockForKey(targetSelection.getStartKey())

  const entitiesSelection = []

  block.findEntityRanges(character => {
    const entityKey = character.getEntity()
    return entityKey !== null && Entity.get(entityKey).getType() === entityType
  }, (start, end) => {

    const isSelected = end >= endOffset && start <= endOffset

    if (isSelected) {
      entitiesSelection.push({
        blockKey: block.getKey(),
        entityKey: block.getEntityAt(start),
        start,
        end
      })
    }
  })

  return entitiesSelection
}

export default getSelectionEntities
