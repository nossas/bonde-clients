

function AlignmentNode({ children, node: { data } }) {
  let Node = 'div'
  if (data.get('currentBlockType') === 'grid-cell') Node = 'td'

  return (
    <Node style={{ textAlign: `${data.get('align')}` }}>
      {children}
    </Node>
  )
}

export default AlignmentNode
