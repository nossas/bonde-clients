import React from 'react'
import { Flexbox2 } from 'bonde-styleguide'
import { TutorialProvider, TutorialDialog } from '../../components/Tutorial'

const BoxStyles = ({ color }) => ({
  display: 'block',
  backgroundColor: color,
  width: '100%',
  height: '290px'
})

const Box = ({ name, color }) => (
  <div style={BoxStyles({ color })}>
    {name}
  </div>
)

export default () => (
  <TutorialProvider name='tutorialTest'>
    <TutorialDialog
      name='title'
      step={1}
      title='Escrevendo alguma coia'
      description='Mais alguma coisa sendo escrita'
    >
      <h1>Test page</h1>
    </TutorialDialog>
    <Box name='step1' color='blue' />
    <Box name='step2' color='green' />
    <Flexbox2 horizontal>
      <Box name='step3' color='pink' />
      <Box name='step4' color='purple' />
    </Flexbox2>
  </TutorialProvider>
)
