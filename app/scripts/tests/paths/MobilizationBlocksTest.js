import * as MobilizationBlocksPaths from './../../paths/MobilizationsPaths'

describe('#newMobilizationBlockPath', () => {
  it('should return the path', () => {
    expect(MobilizationBlocksPaths.mobilizationPath(1)).to.equal('/mobilizations/1')
  })
})
