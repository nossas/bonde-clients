import { Types } from '../rootReducer'
import { selectPage } from './'

describe('package/actions', () => {
  it('should dispatch SELECT_PAGE with meta, blocks and widgets', () => {
    const meta = 'meta'
    const blocks = ['blocks']
    const widgets = ['widgets']
    expect(selectPage(meta, blocks, widgets)).to.deep.equal({
      type: Types.SELECT_PAGE,
      payload: { meta, blocks, widgets }
    })
  })
})
