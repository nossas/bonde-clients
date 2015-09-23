import React, { PropTypes } from 'react'
import classnames from 'classnames'
import { DropDownMenu, NavbarButton } from './'

export default class Navbar extends React.Component {
  static propTypes = {
    blocks: PropTypes.object.isRequired
  }

  renderNavbarButtons(mobile) {
    const className = classnames(
      'button button-transparent white p2',
      {block: mobile}
    )

    return (
      this.props.blocks.data.map((block) => {
        return (
          <NavbarButton
            targetId={'block-' + block.id}
            className={className}>
            Bloco {block.id}
          </NavbarButton>
        )
      })
    )
  }

  render() {
    return (
      <div className='relative fixed z1 full-width navbar'>
        <div className='absolute full-width bg-darken-4'>
          <div className="container">
            <div className="lg-show center">
              {this.renderNavbarButtons(false)}
            </div>
            <div className="lg-hide show">
              <DropDownMenu
                menuClassName="rounded m1 overflow-hidden bg-darken-4"
                icon="bars">
                {this.renderNavbarButtons(true)}
              </DropDownMenu>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
