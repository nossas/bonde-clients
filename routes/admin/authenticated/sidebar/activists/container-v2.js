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

    const { fetch, data, loading, totalCount } = this.props
    const { indexPage, lastPage, onNextPage, onPreviousPage } = this.props

    const { selected, onSelectRow, onSelectAll, selecting } = this.props
    
    console.log('selected', selected)

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
          <h3>{`Página ${indexPage} de ${lastPage} [Total ${totalCount}]`}</h3>
          <a href='#' onClick={() => onSelectAll()}>Selecionar todos</a>
          {selecting && <Loading />}
          {loading ? <Loading /> : (
            <div>
              <ul>
                {data.map(d => (
                  <li
                    key={d.id}
                    style={{
                      cursor: 'pointer',
                      color: selected.indexOf(d.id) !== -1
                        ? '#c7c7c7'
                        : '#000000'
                    }}
                    onClick={() => onSelectRow(d.id)}
                  >
                    <p>{d.name}</p>
                  </li>
                ))}
              </ul>
              {(indexPage > 1) && (
                <button type='button' onClick={onPreviousPage}>
                  Anterior
                </button>
              )}
              {(indexPage !== lastPage) && (
                <button type='button' onClick={onNextPage}>
                  Próximo
                </button>
              )}
            </div>
          )}
        </SettingsPageContentLayout>
      </SettingsPageLayout>
    )
  }
}

export default Container
