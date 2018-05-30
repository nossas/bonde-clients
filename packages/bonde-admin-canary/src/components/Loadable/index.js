import Loadable from 'react-loadable'
import LoadingFullScreen from './LoadingFullScreen' 

export const FullScreenLoadable = (opts) => Loadable(Object.assign({
  loading: LoadingFullScreen
}, opts))
