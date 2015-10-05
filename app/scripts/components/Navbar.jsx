import React, { PropTypes } from 'react'
import classnames from 'classnames'
import { DropDownMenu, NavbarButton } from './'

export default class Navbar extends React.Component {
  static propTypes = {
    blocks: PropTypes.object.isRequired,
    mobilization: PropTypes.object.isRequired
  }

  renderNavbarButtons(mobile) {
    const { blocks, mobilization } = this.props
    const { header_font: headerFont, body_font: bodyFont } = mobilization
    const className = classnames(
      'button button-transparent white p2',
      `${headerFont}-header`,
      `${bodyFont}-body`,
      { block: mobile }
    )

    return (
      blocks.data.map((block) => {
        return (
          <NavbarButton
            targetId={'block-' + block.id}
            scrollableId='blocks-list'
            className={className}>
            Bloco {block.id}
          </NavbarButton>
        )
      })
    )
  }

  render() {
    return (
      <div className="absolute full-width z1">
        <div className="lg-show center">
          <div className="bg-darken-3">
            {this.renderNavbarButtons(false)}
          </div>
        </div>
        <div className="lg-hide show">
          <DropDownMenu
            menuClassName="rounded mt1 mr1 overflow-hidden bg-darken-3 white"
            icon="bars">
            {this.renderNavbarButtons(true)}
          </DropDownMenu>
        </div>
      </div>
    )
  }
}
