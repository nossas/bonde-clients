import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Background } from '~client/components/layout'
import { StepsContainerStack, StepContent } from '~client/components/steps'
import { Tabs, Tab } from '~client/components/navigation/tabs'
import { ActivistSegmentationForm, FacebookBotMassMessageForm, Preview } from './components'

var styles = require('exenv').canUseDOM ? require('./page.scss') : {}

const totalActivists = 452

class BotPage extends Component {
  render () {
    const { image } = this.props

    return (
      <Background image={image} alignment={{ x: 'center', y: 'center' }} contentSize={12}>
        <Preview
          list={require('./mock-activists').default}
          total={totalActivists}
        />

        <div className={styles.stepsContainer}>
          <h1 className={styles.stepsTitle}>
            Envio de mensagem em massa
          </h1>
          <StepsContainerStack
            ComponentPointerContainer={Tabs}
            ComponentPointerChildren={Tab}
            pointerChildrenProps={({ index, step }) => ({ isActive: index === step, index })}
            progressValidations={[() => false, () => false]}
          >
            <StepContent>
              <ActivistSegmentationForm
                totalActivists={totalActivists}
              />
            </StepContent>

            <StepContent>
              <FacebookBotMassMessageForm
                totalActivists={totalActivists}
              />
            </StepContent>
          </StepsContainerStack>
        </div>
      </Background>
    )
  }
}

export default BotPage
