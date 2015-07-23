import * as MobilizationsPaths from './../../paths/MobilizationsPaths'

describe('#mobilizationPath', () => {
  it('should return the path', () => {
    expect(MobilizationsPaths.mobilizationPath(1)).to.equal('/mobilizations/1')
  })
})

describe('#editMobilizationPath', () => {
  it('should return the path', () => {
    expect(MobilizationsPaths.editMobilizationPath(1)).to.equal('/mobilizations/1/edit')
  })
})
