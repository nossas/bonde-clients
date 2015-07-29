import { FETCH_MOBILIZATIONS } from '../../constants/ActionTypes'
import * as MobilizationActions from './../../actions/MobilizationActions'
import $ from 'jquery'

const BASE_URL = process.env.BASE_URL

describe('MobilizationActions', () => {
  describe('#fetchMobilizations', () => {
    it('should GET mobilizations using correct URL and dispatch action', () => {
      const dispatch = sandbox.spy()
      MobilizationActions.fetchMobilizations()(dispatch)
      const request = requests[0]
      const mobilizations = [{id: 1}, {id: 2}]
      expect(request.url).to.equal(`${BASE_URL}/mobilizations`)
      expect(request.method).to.equal('GET')
      request.respond(200, { "Content-Type": "application/json" }, JSON.stringify(mobilizations))
      expect(dispatch).to.have.been.calledWith({
        type: FETCH_MOBILIZATIONS,
        mobilizations
      })
    })
  })
})
