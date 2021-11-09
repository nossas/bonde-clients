// import { connect } from 'react-redux'
import { useAppState } from '../../Application'
import Selectors from '../../selectors'
// import { asyncUpdateBlock, handleChangeBackground, handleCancelEdit, handleUploadFile } from '../redux/action-creators'

import BlockChangeBackground, { BLOCK_UPLOAD_KEY } from './block-change-background'

// const mapStateToProps = (state, props) => ({
//   progress: Selectors(state, props).getUploadProgress(BLOCK_UPLOAD_KEY),
//   mobilization: Selectors(state, props).getMobilization()
// })

// const mapActionsToProps = {
//   update: asyncUpdateBlock,
//   onChangeBackground: handleChangeBackground,
//   onCancelEdit: handleCancelEdit,
//   onUploadFile: handleUploadFile
// }

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default (properties: any): React.ReactElement => {
  const { state } = useAppState();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const changeBackgroundProperties: any = {
    progress: Selectors(state, properties).getUploadProgress(BLOCK_UPLOAD_KEY),
    mobilization: Selectors(state, properties).getMobilization(),
    update: (): void => console.log("update"),
    onChangeBackground: (): void => console.log("onChangeBackground"),
    onCancelEdit: (): void => console.log("onCancelEdit"),
    onUploadFile: (): void => console.log("onUploadFile")
  };

  // eslint-disable-next-line react/jsx-props-no-spreading
  return <BlockChangeBackground {...properties} {...changeBackgroundProperties} />;
}
