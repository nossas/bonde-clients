// import { connect } from 'react-redux'
import { useAppState } from '../../Application';
import WidgetOverlay from './widget-overlay'
import Selectors from '../../selectors';

// import {
//   handleMouseOver as onMouseOver,
//   handleMouseOut as onMouseOut
// } from '../redux/action-creators'


// const mapStateToProperties = (state, properties) => {
//   const selectors = Selectors(state, properties)
//   return {
//     hasMouseOver: selectors.hasMouseOver('widget', properties.widget.id)
//   }
// }

// const mapActionsToProperties = { onMouseOver, onMouseOut }

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default (properties: any): React.ReactElement => {
  const { state } = useAppState();
  const selectors = Selectors(state, properties);

  const overlayProperties = {
    // eslint-disable-next-line react/destructuring-assignment
    hasMouseOver: selectors.hasMouseOver('widget', properties.widget.id),
    onMouseOver: (): void => console.log("onMouseOver"),
    onMouseOut: (): void => console.log("onMouseOut")
  }

  // eslint-disable-next-line react/jsx-props-no-spreading
  return <WidgetOverlay {...properties} {...overlayProperties} />
}
