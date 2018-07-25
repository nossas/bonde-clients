import React from 'react'
import { Button, Flexbox2 as Flexbox, Tooltip, Title, Text } from 'bonde-styleguide'

const Navigation = ({ onNext, onClose, currentStep, total }) => (
  <Flexbox horizontal middle>
    <Title.H5 color='#fff'>{currentStep} / {total}</Title.H5>
    {currentStep < total && (
      <React.Fragment>
        <Button dark flat onClick={onClose}>
          Pular tour
        </Button>
        <Button dark onClick={onNext}>
          Próxima parada
        </Button>
      </React.Fragment>
    )}
    {currentStep >= total && (
      <React.Fragment>
        <Button dark flat onClick={onNext}>
          Rever Tour
        </Button>
        <Button dark onClick={onClose}>
          Finalizar Tour
        </Button>
      </React.Fragment>
    )}
  </Flexbox>
)

const Header = ({ title, subtitle }) => (
  <React.Fragment>
    {title && (
      <Title.H3 color='#fff' margin={{ bottom: 25 }}>{title}</Title.H3>
    )}
    {subtitle && (
      <Text color='#fff' margin={{ bottom: 20 }}>{subtitle}</Text>
    )}
  </React.Fragment>
)

const Box = ({
  children,
  width,
  minHeight,
  title,
  subtitle,
  currentStep,
  total,
  onNext,
  onClose,
  placement
}) => (
  <Tooltip
    onClose={onClose}
    width={width}
    minHeight={minHeight}
    Content={() => (
      <React.Fragment>
        <Header title={title} subtitle={subtitle} />
        <Navigation
          currentStep={currentStep}
          total={total}
          onNext={onNext}
          onClose={onClose}
        />
      </React.Fragment>
    )}
    placement={placement}
  >
    {children}
  </Tooltip>
)

Box.defaultProps = {
  width: 445,
  minHeight: 226
}

export default Box
