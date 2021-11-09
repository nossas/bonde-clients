import classnames from 'classnames'
// import PropTypes from 'prop-types'
import React from 'react'
// import { FormattedMessage } from 'react-intl'
import type { Block, Mobilization } from "../../reducers";
import { ColorPicker } from './color-picker';
import FileUploader from './file-uploader'

export const BLOCK_UPLOAD_KEY = 'bgBlock'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
class ColorPickerButton extends React.Component<any, any> {
  constructor(properties) {
    super(properties)
    this.state = {
      show: false
    }
  }

  onChangeColor(color) {
    this.props.onChange(JSON.stringify(color.rgb))
  }

  render(): React.ReactElement {
    return (
      <div>
        <button
          type="button"
          className={classnames('btn white', { 'bg-darken-4': this.state.show })}
          style={{ height: '55px', borderRight: '1px solid rgba(119, 119, 119, 0.33)' }}
          onClick={() => this.setState({ show: !this.state.show })}
        >
          <i className='fa fa-eyedropper' />
        </button>
        <div className='fixed z5'>
          <ColorPicker
            theme={this.props.theme}
            showColorPicker={this.state.show}
            color={this.props.color}
            onChangeColor={this.onChangeColor.bind(this)}
          />
        </div>
      </div>
    )
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const rgba = (block: Block): any | undefined => {
  if (block.bg_class) {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      return JSON.parse(block.bg_class)
    } catch {
      // Silent error because use className
      return undefined;
    }
  }
}

interface BlockChangeBackgroundProperties {
  block: Block;
  mobilization: Mobilization;
  update: (block: Block) => void;
  onChangeBackground: (block: Block) => void;
  onCancelEdit: (block: Block) => void;
  onUploadFile: (key: string, progress?: number) => void;
  progress?: number;
}


const BlockChangeBackground = ({
  mobilization,
  block,
  onChangeBackground,
  progress,
  onUploadFile,
  onCancelEdit,
  update }: BlockChangeBackgroundProperties): React.ReactElement => (
  <div className='absolute col-12 top-0 left-0 bg-darken-4 z5'>
    <div className='flex flex-wrap'>
      <ColorPickerButton
        color={rgba(block)}
        theme={mobilization.color_scheme}
        onChange={(color: string): void => {
          onChangeBackground({ ...block, bg_class: color })
        }}
      />
      <FileUploader
        file={block.bg_image}
        progress={progress}
        onProgress={(p: number): void => onUploadFile(BLOCK_UPLOAD_KEY, p)}
        onRemove={(): void => onChangeBackground({ ...block, bg_image: '' })}
        onFinish={(file: string): void => {
          onUploadFile(BLOCK_UPLOAD_KEY)
          onChangeBackground({ ...block, bg_image: file })
        }}
      />
      <div className='absolute right-0 mt1 mr2 nowrap'>
        <button
          type="button"
          className='btn caps bg-darken-4 white rounded mr1 save-btn'
          style={{ heigth: '40px' }}
          disabled={progress !== undefined}
          onClick={(): void => {
            update(block)
            onCancelEdit(block)
          }}
        >
          Salvar
          {/* <FormattedMessage
            id='mobrender.components--block-change-background.button.save'
            defaultMessage='Salvar'
          /> */}
        </button>
        <button
          type="button"
          className='btn caps bg-darken-4 white rounded cancel-btn'
          style={{ heigth: '40px' }}
          onClick={(): void => onCancelEdit(block)}
        >
          Cancelar
          {/* <FormattedMessage
            id='mobrender.components--block-change-background.button.cancel'
            defaultMessage='Cancelar'
          /> */}
        </button>
      </div>
    </div>
    <div
      className='fixed top-0 right-0 bottom-0 left-0 z3'
      style={{ marginTop: '50px' }}
      onClick={(): void => onCancelEdit(block)}
    />
  </div>
);

export default BlockChangeBackground
