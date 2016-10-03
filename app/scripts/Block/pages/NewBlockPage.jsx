import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import classnames from 'classnames'

import * as Paths from '../../Paths'
import { BLOCK_LAYOUTS } from '../../constants/BlockLayouts'
import { setSelectedLayout, setSelectedColor } from '../BlockActions'
import { addBlock } from '../../reducers/blocks'
import { BlockMiniature } from '../components'
import { Tabs, Tab } from '../../../components/Navigation'
import ColorPicker from '../../../components/ColorPicker'

import './scss/new-block-page.scss'

export class NewBlockPage extends Component {
  componentWillReceiveProps(nextProps) {
    const { blocks, mobilization } = this.props

    if (blocks.data.length !== nextProps.blocks.data.length) {
      const { router } = this.context
      router.transitionTo(`${Paths.editMobilization(mobilization.id)}?newBlock=true`)
    }
  }

  render() {
    const { dispatch, auth, selectedColor, bgImage, mobilization, selectedLayout } = this.props
    const { color_scheme: colorScheme } = mobilization

    return (
      <div className="new-block-page col-12 flex flex-column bg-silver gray relative pl4">
        <div className="new-block-header bg-white pt3 pr4 pl5">
          <h1 className="h1 mt0 mb3">Adicione um bloco de conteúdo</h1>
          <Tabs>
            <Tab text="Blocos em branco" isActive={true} />
          </Tabs>
        </div>


        <div className="clearfix overflow-auto">
          <div className="col-6 clearfix py3 pr4 pl5">
            <p className="lightgray mb2">
              Os blocos serão adicionados ao fim da sua página, mas você pode trocá-los de ordem a
              qualquer momento
            </p>

            <label className="block-type bold mb1 block gray20">
              Tipo de bloco
            </label>
            <div className="mxn1 clearfix">
              {BLOCK_LAYOUTS.map((layout, index) => (
                <BlockMiniature
                  key={index}
                  layout={layout}
                  selectedLayout={selectedLayout}
                  onClick={() => { dispatch(setSelectedLayout(layout)) }}
                />
              ))}
            </div>


            <label className="block-type bold mb1 block gray20">
              Fundo
            </label>
            <ColorPicker dispatch={dispatch} theme={colorScheme.replace('-scheme', '')} />

            <button
              className="new-block-button btn float-btn-menu rounded"
              onClick={() => {
                const action = addBlock({
                  mobilization_id: mobilization.id,
                  credentials: auth.credentials,
                  block: {
                    bg_class: JSON.stringify(selectedColor),
                    bg_image: bgImage,
                    widgets_attributes: selectedLayout.map(column => ({ kind: 'draft', ...column }))
                  }
                })
                dispatch(action)
              }}
            >
              Adicionar
            </button>
          </div>
        </div>
      </div>
    )
  }
}

NewBlockPage.contextTypes = {
  router: React.PropTypes.object
}

NewBlockPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  blocks: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  mobilization: PropTypes.object.isRequired,
  selectedColor: PropTypes.object.isRequired,
  bgImage: PropTypes.string,
  selectedLayout: PropTypes.array.isRequired
}

NewBlockPage.defaultProps = {
  selectedLayout: BLOCK_LAYOUTS[0],
  selectedColor: { r: 51, g: 51, b: 51, a: 1 },
  bgImage: null
}

const mapStateToProps = state => ({
  selectedLayout: state.blockReducer.selectedLayout,
  selectedColor: state.colorPicker.color
})

export default connect(mapStateToProps)(NewBlockPage)
