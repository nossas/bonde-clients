import React, { PropTypes } from 'react'
import ReactS3Uploader from 'react-s3-uploader'
import classnames from 'classnames'

import * as Paths from '../Paths'
import { BLOCK_LAYOUTS } from '../constants/BlockLayouts'
import { addBlock } from '../reducers/blocks'
import { BlockMiniature } from '../Block/components'
import { Tabs } from '../../components/Navigation'

export default class NewBlock extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    blocks: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    mobilization: PropTypes.object.isRequired
  }

  static contextTypes = {
    router: React.PropTypes.object
  }

  constructor(props, context) {
    super(props, context)
    this.state = {
      selectedLayout: BLOCK_LAYOUTS[0],
      bgClass: 'bg-1',
      bgImage: null
    }
  }

  componentWillReceiveProps(nextProps) {
    const {blocks, mobilization} = this.props

    if (blocks.data.length !== nextProps.blocks.data.length) {
      const {router} = this.context
      router.transitionTo(Paths.editMobilization(mobilization.id) + '?newBlock=true')
    }
  }

  handleAddBlockClick() {
    const { dispatch, auth } = this.props

    const action = addBlock({
      mobilization_id: this.props.mobilization.id,
      credentials: auth.credentials,
      block: {
        bg_class: this.state.bgClass,
        bg_image: this.state.bgImage,
        widgets_attributes: this.state.selectedLayout.map((column) => {
          return { kind: 'draft', ...column }
        })
      }
    })

    dispatch(action)
  }

  render() {
    const { mobilization: { color_scheme: colorScheme } } = this.props

    return (
      <div className={classnames('flex-auto bg-silver gray relative', colorScheme)}>
        <div className="new-block-header bg-white pt3 px4">
          <h1 className="h1 mt0 mb3">Adicione um bloco de conteúdo</h1>
          <Tabs items={['Blocos em branco']} />
        </div>

        <div className="py3 px4 col-6">
          <p className="lightgray mb2">
            Os blocos serão adicionados ao fim da sua página, mas você pode trocá-los de ordem a
            qualquer momento
          </p>

          <label
            className="bold mb1 block gray20"
            style={{ marginBottom: '1.3rem', marginTop: '1.3rem' }}
          >
            Tipo de bloco
          </label>
          <div className="mxn1">
            {BLOCK_LAYOUTS.map((layout, index) => {
              return (
                <BlockMiniature
                  key={index}
                  layout={layout}
                  selectedLayout={this.state.selectedLayout}
                  onClick={(layout) => { this.setState({ selectedLayout: layout }) }}
                />
              )
            })}
          </div>
          <button
            className="btn bg-pagenta white rounded"
            disabled={!!this.state.uploadProgress}
            onClick={::this.handleAddBlockClick}
            style={{
              position: 'absolute',
              right: '20px',
              top: '20px',
              fontSize: '1.1rem',
              paddingTop: '.6rem',
              paddingBottom: '.6rem'
            }}
          >
            Adicionar
          </button>
        </div>
      </div>
    )
  }
}
