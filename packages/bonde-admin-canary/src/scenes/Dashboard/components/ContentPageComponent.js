import React from 'react'
import PropTypes from 'prop-types'
import { Flexbox2 as Flexbox, Spacing, Icon, Title } from 'bonde-styleguide'
import { ButtonLink } from 'components/Link'

const ContentPage = ({ backward, title, children, tabs, actions, fullPage, fixRender, ...rest }) => {
  if (!fixRender) {
    children = children ? React.createElement(children, { ...rest }) : <Title.H1>Empty Page</Title.H1>
  }

  const linkProps = {}
  if (typeof backward === 'string') {
    linkProps.to = backward
  } else {
    linkProps.onClick = backward
  }

  return (
    <Flexbox vertical padding={{ top: 13 }}>
      {(tabs || backward || actions) && (
        <Spacing margin={{ bottom: 13, x: 60 }}>
          <Flexbox horizontal spacing='between' align='middle'>
            {backward ? (
              <ButtonLink flat padding='0!important' style={{ minWidth: '200px' }} {...linkProps}>
                <Flexbox horizontal align='middle'>
                  <Spacing margin={{ right: 5, top: 1 }}>
                    <Icon name='arrow-left' />
                  </Spacing>
                  <Title.H5 margin={{ top: 5, bottom: 0 }}>{title}</Title.H5>
                </Flexbox>
              </ButtonLink>
            ) : <div />}
            {tabs ? tabs({ ...rest }) : <div />}
            {actions ? actions({ ...rest }) : <div />}
          </Flexbox>
        </Spacing>
      )}
      <section
        style={{
          height: '100%',
          padding: fullPage ? '0 0 0 0' : '0 60px 13px'
        }}
      >
        {children}
      </section>
    </Flexbox>
  )
}

ContentPage.propTypes = {
  backward: PropTypes.string,
  title: PropTypes.string,
  children: PropTypes.any,
  tabs: PropTypes.any,
  actions: PropTypes.any,
  fullPage: PropTypes.bool,
  fixRender: PropTypes.bool
}

ContentPage.defaultProps = {
  fullPage: false,
  fixRender: false
}

export default ContentPage
