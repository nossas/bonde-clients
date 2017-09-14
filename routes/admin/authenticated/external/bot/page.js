import PropTypes from 'prop-types'
import React, { Component } from 'react'

import { Background } from '~client/components/layout'
import { Tabs, Tab } from '~client/components/navigation/tabs'
import { Loading } from '~client/components/await'
import { StepsContainerStack, StepContent } from '~client/components/steps'
import { ActivistSegmentationForm, FacebookBotMassMessageForm, Preview } from './components'

var styles = require('exenv').canUseDOM ? require('./page.scss') : {}

class BotPage extends Component {
  constructor (props) {
    super(props)
    this.state = {
      loading: false,
      listActivists: [],
      totalActivists: 0
    }
  }

  changeState (state) {
    this.setState({ ...this.state, ...state })
  }

  render () {
    const { image } = this.props
    const { loading, listActivists, totalActivists } = this.state

    return (
      <Background image={image} alignment={{ x: 'center', y: 'center' }} contentSize={12}>
        <div style={{ display: 'flex' }}>
          {listActivists.length && (
            <Preview
              list={listActivists}
              total={totalActivists}
            />
          )}

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
                  changeParentState={::this.changeState}
                />
              </StepContent>

              <StepContent>
                <FacebookBotMassMessageForm
                  totalActivists={totalActivists}
                  changeParentState={::this.changeState}
                />
              </StepContent>
            </StepsContainerStack>
          </div>

          {loading && <Loading />}
        </div>
      </Background>
    )
  }
}

export default BotPage
