import React from 'react'
import { Button, Cell, Grid } from 'bonde-styleguide'
import { TutorialProvider, TutorialDialog } from '../../components/Tutorial'

const BoxStyles = ({ color }) => ({
  display: 'block',
  backgroundColor: color,
  width: '100%',
  height: '150px'
})

const Box = ({ name, color }) => (
  <div style={BoxStyles({ color })}>
    {name}
  </div>
)

export default class extends React.Component {

  constructor (...args) {
    super(...args)
    this.state = { init: false }
  }
  
  onClose () {
    this.setState({ init: false })
  }

  render () {
    return (
      <TutorialProvider
        initialize={this.state.init}
        onClose={this.onClose.bind(this)}
      >
        <TutorialDialog
          name='tutorial-step-1'
          step={1}
          title='Step Title'
          description='Step Description'
        >
          <h1>Test page</h1>
        </TutorialDialog>

        <TutorialDialog
          name='tutorial-step-2'
          step={2}
          title='Step Title'
          description='Step Description'
        >
          <h1>Test page</h1>
        </TutorialDialog>

        <Box name='step1' color='blue' />
        <Box name='step2' color='green' />

        <Grid>
          <Cell size={[4, 4, 4]}>
              <Box name='step3' color='pink' />
          </Cell>
          <Cell size={[4, 4, 4]}>
            <TutorialDialog
              name='tutorial-step-3'
              step={3}
              title='Step Title'
              description='Step Description'
            >
              <Box name='step4' color='purple' />
            </TutorialDialog>
          </Cell>
        </Grid>
        <Button onClick={() => this.setState({ init: true })}>Iniciar tour</Button>
      </TutorialProvider>
    )
  }
}
