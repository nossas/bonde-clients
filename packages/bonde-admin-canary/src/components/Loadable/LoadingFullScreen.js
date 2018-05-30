import React from 'react'
import { Backdrop, Loading, Text, Title } from 'bonde-styleguide'

const LoadingFullScreen = (props) => {
  if (props.error) {
    return <div>Error! <button onClick={props.retry}>Retry</button></div>
  } else if (props.timedOut) {
    return <div>Taking a long time... <button onClick={ props.retry }>Retry</button></div>;
  } else if (props.pastDelay) {
    return (
      <Backdrop color='#FFFFFF'>
        <Text align='center' margin={{ top: '20vh' }}>
          <Loading
            size={109}
            sparklesDuration='3s'
          />
        </Text>
        <Title.H3 align='center'>
          Preparando seu BONDE.
        </Title.H3>
      </Backdrop>
    )
  } else {
    return null
  }
}

export default LoadingFullScreen
