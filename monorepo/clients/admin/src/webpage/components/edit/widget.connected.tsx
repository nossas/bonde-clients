import { useAppState } from '../../Application'
import Selectors from '../../selectors'
// import { asyncUpdateWidget as update } from '../redux/action-creators'
import Widget from './widget'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default (properties: any): React.ReactElement => {
  const { state } = useAppState();
  const selectors = Selectors(state, properties)
  const widgetProperties = {
    saving: selectors.widgetsIsLoading(),
    mobilization: selectors.getMobilization() || selectors.getMobilizations()[0],
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    update: () => console.log("asyncUpdateWidget")
  }

  // eslint-disable-next-line react/jsx-props-no-spreading
  return <Widget {...widgetProperties} {...properties} />;
}
