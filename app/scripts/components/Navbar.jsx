import React, { PropTypes } from 'react'
import classnames from 'classnames'
import { DropDownMenu, NavbarEditionWrapper } from './'

export default class Navbar extends React.Component {
  static propTypes = {
    blocks: PropTypes.object.isRequired,
    mobilization: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
    editable: PropTypes.bool
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
          <NavbarEditionWrapper
            {...this.props}
            block={block}
            className={className}
          />
        )
      })
    )
  }

  render() {
    return (
      <div className="absolute full-width z1">
        <div className="lg-show center">
          <div className="bg-darken-4">
            {this.renderNavbarButtons(false)}
          </div>
        </div>
        <div className="lg-hide show">
          <DropDownMenu
            menuClassName="rounded mt1 mr1 overflow-hidden bg-darken-4 white"
            icon="bars">
            {this.renderNavbarButtons(true)}
          </DropDownMenu>
        </div>
      </div>
    )
  }
}
