import * as Paths from './../Paths'

describe('#mobilization', () => {
  it('should return the path', () => {
    expect(Paths.mobilization(1)).to.equal('/mobilizations/1')
  })
})

describe('#editMobilization', () => {
  it('should return the path', () => {
    expect(Paths.editMobilization(1)).to.equal('/mobilizations/1/edit')
  })
})

describe('#newMobilizationBlock', () => {
  it('should return the path', () => {
    expect(Paths.newMobilizationBlock(1)).to.equal('/mobilizations/1/blocks/new')
  })
})
