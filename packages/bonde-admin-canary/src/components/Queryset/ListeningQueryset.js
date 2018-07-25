import { connect } from 'services/redux'
import QueryObject from './QueryObject'

const ListeningQueryset = ({ children, done, length }) => {
  
  return children({ done, length })
}

  
const mapStateToProps = (state, ownProps) => {
  const queryObject = new QueryObject(ownProps.query)
  const observable = state.queryset.observable[queryObject.name]
  return observable ? {
    done: observable.done,
    length: observable.length
  } : {}
}

export default connect(mapStateToProps)(ListeningQueryset)
