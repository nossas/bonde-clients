import React from 'react'
import PropTypes from 'prop-types'
import { Flexbox2 as Flexbox, Spacing, Icon, Title } from 'bonde-styleguide'
import { ButtonLink } from 'components/Link'

const ContentPage = ({ backward, title, children, tabs, actions, ...rest }) => (
  <Flexbox vertical>
    {(tabs || backward || actions) && (
      <Spacing margin={{ top: 20 }}>
        <Flexbox horizontal spacing='between'>
          {backward ? (
            <ButtonLink flat to={backward} padding='0!important' style={{ minWidth: '200px' }}>
              <Flexbox horizontal>
                <Spacing margin={{ right: 5, top: 1 }}>
                  <Icon name='arrow-left' />
                </Spacing>
                <Title.H5>{title}</Title.H5>
              </Flexbox>
            </ButtonLink>
          ) : <div />}
          {tabs ? tabs({ ...rest }) : <div />}
          {actions ? actions({ ...rest }) : <div />}
        </Flexbox>
      </Spacing>
    )}
    <Spacing margin={{ top: 20 }}>
      {children ? React.createElement(children, { ...rest }) : <Title.H1>Empty Page</Title.H1>}
    </Spacing>
  </Flexbox>
)

ContentPage.propTypes = {
  backward: PropTypes.string,
  title: PropTypes.string,
  children: PropTypes.any,
  tabs: PropTypes.any,
  actions: PropTypes.any
}

export default ContentPage
