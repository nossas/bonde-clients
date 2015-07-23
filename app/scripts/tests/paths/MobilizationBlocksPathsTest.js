import * as MobilizationBlocksPaths from './../../paths/MobilizationBlocksPaths'

describe('#newMobilizationBlockPath', () => {
  it('should return the path', () => {
    expect(MobilizationBlocksPaths.newMobilizationBlockPath(1)).to.equal('/mobilizations/1/blocks/new')
  })
})
