import React from 'react'
import { Button, Text } from 'bonde-styleguide'
import { Zoom } from 'bonde-diagram'

const styles = {
  Button: {
    position: 'absolute',
    right: '10px',
    bottom: '10px'
  }
}

const ZoomButton = () => (
  <Zoom>
    <Button style={styles.Button} light>
      <Text fontSize={10}>Zoom to fit</Text>
    </Button>
  </Zoom>
)

export default ZoomButton