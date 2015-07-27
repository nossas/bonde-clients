import { FETCH_MOBILIZATIONS } from '../../constants/ActionTypes'
import * as MobilizationActions from './../../actions/MobilizationActions'
import $ from 'jquery'

let xhr, requests
const BASE_URL = process.env.BASE_URL

describe('MobilizationActions', () => {
  before(() => {
    xhr = sinon.useFakeXMLHttpRequest()
    xhr.onCreate = function (req) { requests.push(req); }
  })

  after(() => {
    xhr.restore()
  })

  beforeEach(() => {
    requests = []
  })

  describe('#fetchMobilizations', () => {
    it('should GET mobilizations using correct URL and dispatch action', () => {
      const dispatch = sinon.spy()
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
