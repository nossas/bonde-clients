import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Link, browserHistory } from 'react-router'
import { Background } from '~client/components/layout'
import * as paths from '~client/paths'
import { Loading } from '~client/components/await'
import { ListItem } from '~client/community/components'

class CommunityListPage extends Component {
  componentWillReceiveProps (nextProps) {
    if (nextProps.isLoaded && nextProps.communities.length === 0) {
      browserHistory.push(paths.communityAdd())
    }
  }

  onClickItem (id) {
    this.props.select(id)
    browserHistory.push(paths.mobilizations())
  }

  render () {
    const { image, isLoading, isLoaded, communities, user } = this.props

    return isLoading || user === undefined ? <Loading /> : (
      <Background image={image} alignment={{ x: 'center', y: 'top' }}>
        <div className='col-12'>
          <h1>Olá {user.firstName || user.first_name},</h1>
          <h2>Escolha uma das suas comunidades</h2>
          {isLoaded ? (
            <div className='rounded bg-white'>
              {communities && communities.map((community, key) => (
                <ListItem
                  key={`list-item-${key}`}
                  community={community}
                  onClick={this.onClickItem.bind(this)}
                />
              ))}
            </div>
          ) : null}
          <p className='white center'>
            ou <Link to={paths.communityAdd()}>Crie uma nova comunidade</Link>
          </p>
        </div>
      </Background>
    )
  }
}

CommunityListPage.propTypes = {
  isLoaded: PropTypes.bool,
  isLoading: PropTypes.bool,
  communities: PropTypes.array,
  user: PropTypes.object,
  // Actions
  select: PropTypes.func.isRequired
}

export default CommunityListPage
