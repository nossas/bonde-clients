import React from 'react'
import {
  Button,
  Flexbox2 as Flexbox,
  Title
} from 'bonde-styleguide'

export default ({ t, onNext, onClose, currentStep, total }) => (
  <Flexbox horizontal middle>
    <Title.H5 color='#fff'>{currentStep} / {total}</Title.H5>
    {currentStep < total && (
      <React.Fragment>
        <Button dark flat onClick={onClose}>
          {t('tutorial.skip')}
        </Button>
        <Button dark onClick={onNext}>
          {t('tutorial.next')}
        </Button>
      </React.Fragment>
    )}
    {currentStep >= total && (
      <React.Fragment>
        <Button dark flat onClick={onNext}>
          {t('tutorial.restart')}
        </Button>
        <Button dark onClick={onClose}>
          {t('tutorial.finish')}
        </Button>
      </React.Fragment>
    )}
  </Flexbox>
)
