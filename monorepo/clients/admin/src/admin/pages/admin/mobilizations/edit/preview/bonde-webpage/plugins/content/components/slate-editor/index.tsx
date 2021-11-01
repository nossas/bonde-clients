import React from 'react'
import { injectIntl, intlShape } from 'react-intl'
import { AlignmentPlugin } from '../../../../../slate-editor-alignment-plugin/src'
import { BoldPlugin } from '../../../../../slate-editor-bold-plugin/src'
import { ColorPlugin } from '../../../../../slate-editor-color-plugin/src'
import { EmbedPlugin } from '../../../../../slate-editor-embed-plugin/src'
import { FontFamilyPlugin } from '../../../../../slate-editor-font-family-plugin/src'
import { FontSizePlugin } from '../../../../../slate-editor-font-size-plugin/src'
import { GridPlugin } from '../../../../../slate-editor-grid-plugin/src'
import { ImagePlugin } from '../../../../../slate-editor-image-plugin/src'
import { ItalicPlugin } from '../../../../../slate-editor-italic-plugin/src'
import { LinkPlugin } from '../../../../../slate-editor-link-plugin/src'
import { ListPlugin } from '../../../../../slate-editor-list-plugin/src'
import { StrikethroughPlugin } from '../../../../../slate-editor-strikethrough-plugin/src'
import { UnderlinePlugin } from '../../../../../slate-editor-underline-plugin/src'
import {
	SlateContent,
	SlateEditor
} from '../../../../../widgets/__plugins__/content/components/editor-slate/slate-editor'

import('./index.scss')

const fontSizePluginOptions = { initialFontSize: 16 }

const plugins = [
	AlignmentPlugin(),
	BoldPlugin(),
	ColorPlugin(),
	EmbedPlugin(),
	FontFamilyPlugin(),
	FontSizePlugin(fontSizePluginOptions),
	GridPlugin(),
	ImagePlugin(),
	ItalicPlugin(),
	LinkPlugin(),
	ListPlugin(),
	StrikethroughPlugin(),
	UnderlinePlugin()
]

class EditorSlate extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			initialState: JSON.parse(props.content)
		}
	}

	render() {
		const { readOnly, contentStyles } = this.props
		return (
			<div className='widgets--content-plugin'>
				<SlateEditor
					plugins={plugins}
					initialState={this.state.initialState}
					style={{ color: '#fff' }}
				>
					<SlateContent
						wrapperStyle={{ position: 'relative', zIndex: 'inherit' }}
						style={{ minHeight: 150, ...contentStyles }}
						readOnly={readOnly}
					/>
				</SlateEditor>
			</div>
		)
	}
}

EditorSlate.propTypes = {
	intl: intlShape.isRequired
}

export default injectIntl(EditorSlate)
