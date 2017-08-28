import React, { Component } from 'react'
import {
  SettingsPageLayout,
  SettingsPageMenuLayout,
  SettingsPageContentLayout
} from '~client/components/layout'
import { Loading } from '~client/components/await'

if (require('exenv').canUseDOM) require('./styles.scss')

const QueryForm = ({
  query,
  onQueryChange,
  onSubmit,
  label,
  buttonText,
  name
}) => (
  <form
    className='query-form pr4 pl3 border-box'
    onSubmit={e => {
      e.preventDefault()
      onSubmit()
    }}
  >
    <i className='fa fa-search' aria-hidden='true'></i> 
    <input
      id={`${name}Id`}
      type='text'
      onChange={onQueryChange}
      value={query}
      placeholder={label}
    />
    {buttonText && (
      <input
        className='absolute'
        type='submit'
        value={buttonText}
      />)}
  </form>
)

const Pagination = ({
  indexPage,
  lastPage,
  onPreviousPage,
  onNextPage
}) => {
  const handleClick = (handle) => (e) => {
    e.preventDefault()
    handle()
  }
  return (
    <div className='pagination clearfix mx-auto'>
      <div className='col col-1'>
        <button
          disabled={indexPage < 2}
          onClick={handleClick(onPreviousPage)}
        >
          <i className='fa fa-arrow-left' aria-hidden="true"></i>
        </button>
      </div>
      <div className='col col-10'>
        <p>{indexPage} / {lastPage}</p>
      </div>
      <div className='col col-1'>
        <button
          disabled={indexPage === lastPage}
          onClick={handleClick(onNextPage)}
        >
          <i className='fa fa-arrow-right' aria-hidden='true'></i>
        </button>
      </div>
    </div>
  )
}

const Row = ({ obj, onSelectRow, isSelected }) => (
  <div className='row clearfix mx-auto'>
    <div className='col col-1'>
      <input
        type='checkbox'
        checked={isSelected}
        onChange={() => onSelectRow(obj.id)}
      />
    </div>
    <div className='col col-6'>
      {obj.name}
    </div>
    <div className='col col-5'>
      {obj.email}
    </div>
  </div>
)


class Container extends Component {

  render () {
    
    const { query, onQueryChange } = this.props

    const { fetch, data, loading, totalCount } = this.props
    const { indexPage, lastPage, onNextPage, onPreviousPage } = this.props

    const { selected, onSelectRow, onSelectAll, selecting } = this.props

    return (
      <SettingsPageLayout>
        <SettingsPageMenuLayout title='Base de usuários' />
        <QueryForm
          name='q'
          label='Filtre por mobilizações ou formulários'
          onSubmit={this.props.fetch}
          query={this.props.query}
          onQueryChange={this.props.onQueryChange}
        />
        <SettingsPageContentLayout>
          <div className='p2'>
            {/* Grid */}
            <div className='counter clearfix'>
              <div className='col col-1'>
                <input
                  id='selectAllId'
                  type='checkbox'
                  checked={selected.length > 0 && selected.length === totalCount}
                  onClick={(evt) => {
                    onSelectAll()
                  }}
                />
              </div>
              <div className='col col-11'>
                {totalCount} pessoas
              </div>
            </div>
            {(selecting || loading) && <Loading />}
            {(
              <div>
                <div>
                  {data.map(d => (
                    <Row
                      obj={d}
                      isSelected={selected.indexOf(d.id) !== -1}
                      onSelectRow={this.props.onSelectRow}
                    />
                  ))}
                </div>
                <Pagination
                  indexPage={this.props.indexPage}
                  lastPage={this.props.lastPage}
                  onPreviousPage={this.props.onPreviousPage}
                  onNextPage={this.props.onNextPage}
                />
              </div>
            )}
          </div>
        </SettingsPageContentLayout>
      </SettingsPageLayout>
    )
  }
}

export default Container
