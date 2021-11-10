// import { connect } from 'react-redux'
import Selectors from '../../selectors'
import { handleMouseOver, handleMouseOut, handleCancelEdit } from '../../actions';
import { useAppState } from '../../Application'
import Block, { HOVER_MOUSE_KEY } from './block'

// const mapStateToProps = (state, props) => {
//   const selectors = Selectors(state)
//   return {
//     editing: selectors.getEditing(),
//     saving: selectors.getBlockSaving(),
//     hasMouseOver: selectors.hasMouseOver(HOVER_MOUSE_KEY, props.block.id)
//   }
// }

// const mapActionsToProps = {
//   onMouseOver: handleMouseOver,
//   onMouseOut: handleMouseOut,
//   onCancelEdit: handleCancelEdit
// }

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default (properties: any): React.ReactElement => {
  const { state, dispatch } = useAppState();
  const selectors = Selectors(state);
  const blockProperties = {
    editing: selectors.getEditing(),
    saving: selectors.getBlockSaving(),
    hasMouseOver: selectors.hasMouseOver(HOVER_MOUSE_KEY, properties.block.id),
    onMouseOver: handleMouseOver(dispatch),
    onMouseOut: handleMouseOut(dispatch),
    onCancelEdit: handleCancelEdit(dispatch)
  };

  // eslint-disable-next-line react/jsx-props-no-spreading
  return <Block {...properties} {...blockProperties} />;
}
