import React from 'react'
import PropTypes from 'prop-types'
import { Button, Flexbox2 as Flexbox, Icon, Text, Spacing } from 'bonde-styleguide'

const AddReply = ({ onQuickReply }) => (
  <Button flat onClick={() => onQuickReply('Texto do botão')}>
    <Flexbox horizontal middle>
      <Icon name='plus' />
      <Spacing margin={{ left: 5 }}>
        <Text fontSize={12}>adicionar resposta</Text>
      </Spacing>
    </Flexbox>
  </Button>
)

AddReply.propTypes = {
  onQuickReply: PropTypes.func.isRequired
}

export default AddReply
