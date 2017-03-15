// polyfill webpack require.ensure
if (typeof require.ensure !== 'function') require.ensure = (d, c) => c(require)
import { UserIsLogged } from '~routes/utils'

export default store => ({

  onEnter: UserIsLogged(store),

  getChildRoutes (location, cb) {
    require.ensure([], (require) => {
      cb(null, [
        require('./external').default(store),
        require('./sidebar').default(store)
      ])
    })
  }
})
