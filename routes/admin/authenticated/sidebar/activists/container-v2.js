import React, { Component } from 'react'
import {
  SettingsPageLayout,
  SettingsPageMenuLayout,
  SettingsPageContentLayout
} from '~client/components/layout'
import { Loading } from '~client/components/await'


class Container extends Component {
  
  render () {
    
    const { query, onQueryChange } = this.props
    const { fetch, data, loading } = this.props

    return (
      <SettingsPageLayout>
        <SettingsPageMenuLayout title='Base de usuários' />
        <SettingsPageContentLayout>
          {/* Filter query form */}
          <form
            onSubmit={(e) => {
              e.preventDefault()
              fetch()
            }}
          >
            <label htmlFor='queryId'>Termo filtrado:</label>
            <input
              id='queryId'
              type='text'
              onChange={onQueryChange}
              value={query}
            />
            <input type='submit' value='Filtrar' />
          </form>
          {/* Grid */}
          {loading ? <Loading /> : (
            <ul>
              {data.map(d => <li>{d.name}</li>)}
            </ul>
          )}
        </SettingsPageContentLayout>
      </SettingsPageLayout>
    )
  }
}

export default Container
