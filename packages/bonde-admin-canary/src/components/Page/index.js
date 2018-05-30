import React from 'react'
import { FullPage } from './components'

export { default as ActionButton } from './ActionButton'

export const PageHOC = ({ pageTitle, actionMenu }) => 
  ({ children, ...ownProps }) => {
    
    const title = typeof pageTitle === 'function'
      ? pageTitle(ownProps) : pageTitle || ownProps.pageTitle

    return (
      <FullPage
        headerID='page-header-id'
        pageTitle={title}
        actionMenu={actionMenu || ownProps.actionMenu}
      >
        {children}
      </FullPage>
    )
  }

export const Page = PageHOC({})
