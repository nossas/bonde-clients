<<<<<<< HEAD
// import { mutation } from 'graphql'
// import { Mobilizations } from 'graphql/mutations'
import CausesGadget from './CausesGadget'

export default CausesGadget

// export default mutation({
//   mutation: Mobilizations.mutation,
//   props: Mobilizations.props
// })(CausesGadget)
=======
import { mutation } from 'graphql'
import { Mobilizations } from 'graphql/mutations'
import CausesGadget from './CausesGadget'

export default mutation({
  mutation: Mobilizations.mutation,
  props: Mobilizations.props
})(CausesGadget)
>>>>>>> refator(admin-canary): trending mobs to causes gadget
