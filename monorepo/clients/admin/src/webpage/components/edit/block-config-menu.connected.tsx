// import { connect } from 'react-redux'
import { useAppState } from '../../Application';
import Selectors from '../../selectors';
import { asyncMoveUp, asyncMoveDown } from '../../async-actions';
// import { asyncMoveUp, asyncMoveDown, asyncUpdateBlock, handleEdit, asyncDestroyBlock } from '../redux/action-creators'
import BlockConfigMenu from './block-config-menu'

// const mapStateToProps = (state, props) => {
//   const selectors = Selectors(state, props)
//   return {
//     canMoveUp: selectors.canMoveUp(),
//     canMoveDown: selectors.canMoveDown()
//   }
// }

// const mapActionsToProps = (dispatch, props) => ({
//   moveUp: block => dispatch(asyncMoveUp(block)),
//   moveDown: block => dispatch(asyncMoveDown(block)),
//   update: block => dispatch(asyncUpdateBlock(block)),
//   onEdit: key => dispatch(handleEdit(key)),
//   destroy: block => dispatch(asyncDestroyBlock(block))
// })

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default (properties: any): React.ReactElement => {
  const { state, dispatch } = useAppState();
  const selectors = Selectors(state, properties);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const configMenuProperites: any = {
    canMoveUp: selectors.canMoveUp(),
    canMoveDown: selectors.canMoveDown(),
    moveUp: asyncMoveUp(dispatch, state),
    moveDown: asyncMoveDown(dispatch, state),
    update: (): void => console.log("update"),
    onEdit: (): void => console.log("onEdit"),
    destroy: (): void => console.log("destroy")
  }
  
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <BlockConfigMenu {...properties} {...configMenuProperites} />;
}
