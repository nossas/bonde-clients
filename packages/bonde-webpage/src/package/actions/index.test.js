import { Types } from '../rootReducer'
import { load } from './'

describe('package/actions', () => {
  it('should dispatch Types.LOAD with meta, blocks and widgets', () => {
    const meta = 'meta'
    const blocks = ['blocks']
    const widgets = ['widgets']
    expect(load(meta, blocks, widgets)).to.deep.equal({
      type: Types.LOAD,
      payload: { meta, blocks, widgets }
    })
  })
})
