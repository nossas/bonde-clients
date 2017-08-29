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
    <i className='fa fa-search' aria-hidden='true' />
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
          <i className='fa fa-arrow-left' aria-hidden='true' />
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
          <i className='fa fa-arrow-right' aria-hidden='true' />
        </button>
      </div>
    </div>
  )
}

const Row = ({ obj, onSelectRow, onClickRow, isSelected, isActived }) => (
  <div
    className={`row clearfix mx-auto px2${isActived ? ' active' : ''}`}
  >
    <div className='col col-1 py2'>
      <input
        type='checkbox'
        checked={isSelected}
        onChange={() => onSelectRow(obj.id)}
      />
    </div>
    <div className='col col-6 py2' onClick={() => onClickRow(obj)}>
      {obj.name}
    </div>
    <div className='col col-5 py2' onClick={() => onClickRow(obj)}>
      {obj.email}
    </div>
  </div>
)

const Detail = ({ obj, onClose }) => (
  <div className='detail col col-4 pl2'>
    <div className='col col-12 title py2'>
      <span>Perfil</span>
      <i
        className='fa fa-close'
        aria-hidden='true'
        onClick={() => onClose(obj)}
      />
    </div>
    <div className='col col-12 bg-white py1 px2'>
      <h3>{obj.name}</h3>
      <div>
        <div>
          <label>E-mail</label>
          <p>{obj.email}</p>
        </div>
      </div>
    </div>
  </div>
)

class Container extends Component {
  constructor (props) {
    super(props)
    this.state = { item: null }
  }

  onClickRow (item) {
    if (this.state.item === item) {
      this.setState({ item: null })
    } else {
      this.setState({ item })
    }
  }

  render () {
    const { data, loading, totalCount } = this.props
    const {
      selected,
      onSelectAll,
      onRemoveAll,
      selecting
    } = this.props
    const isSelectedAll = (
      selected.length > 0 && selected.length === totalCount
    )

    return (
      <SettingsPageLayout>
        <SettingsPageMenuLayout title='Base de usuários' />
        <QueryForm
          name='q'
          label='Filtre por mobilizações ou formulários'
          onSubmit={() => this.props.fetch(true)}
          query={this.props.query}
          onQueryChange={this.props.onQueryChange}
        />
        <SettingsPageContentLayout>
          <div className={(
            this.state.item ? 'col col-8' : ''
          )}>
            <div className='title clearfix p2'>
              <div className='col col-1'>
                <input
                  id='selectAllId'
                  type='checkbox'
                  disabled={totalCount === 0}
                  checked={isSelectedAll}
                  onClick={(evt) => {
                    if (isSelectedAll) {
                      onRemoveAll()
                    } else {
                      onSelectAll()
                    }
                  }}
                />
              </div>
              <div className='col col-11'>
                {totalCount} pessoas
              </div>
            </div>
            {(selecting || loading) && <Loading />}
            <div>
              <div>
                {data.map(d => (
                  <Row
                    obj={d}
                    isSelected={selected.indexOf(d.id) !== -1}
                    isActived={this.state.item === d}
                    onSelectRow={this.props.onSelectRow}
                    onClickRow={this.onClickRow.bind(this)}
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
          </div>
          {this.state.item && (
            <Detail
              obj={this.state.item}
              onClose={this.onClickRow.bind(this)}
            />
          )}
        </SettingsPageContentLayout>
      </SettingsPageLayout>
    )
  }
}

export default Container
