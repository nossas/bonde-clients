import React, { PropTypes } from 'react'
// import { Navigation } from 'react-router'
// import reactMixin from 'react-mixin'

import * as paths from '~client/paths'
import { PageTabLayout } from '~mobilizations/components'
import MobilizationBasicsForm from '~mobilizations/components/mobilization-basics-form'

// @revert @reactMixin.decorate(Navigation)
const NewMobilizationPage = props => (
  <PageTabLayout location={props.location}>
    <div className='page-add'>
      <h2 className='h1 mt0 mb3 center'>Qual o objetivo da sua mobilização?</h2>
      <MobilizationBasicsForm
        className='bg-white'
        onFinishSubmit={() => {
          const { mobilization } = props
          mobilization && this.transitionTo(
            paths.mobilizationTemplatesChoose(mobilization)
          )
        }}
        {...props}
      />
      <p className='lightgray center' style={{ fontSize: '.9rem', marginTop: '1.5rem' }}>
        Fique tranquil@ vc poderá editar depois se achar necessário.
      </p>
    </div>
  </PageTabLayout>
)

NewMobilizationPage.propTypes = {
  mobilization: PropTypes.object.isRequired
}

export default NewMobilizationPage
