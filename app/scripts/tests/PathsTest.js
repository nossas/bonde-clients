import * as Paths from './../Paths'

describe('Paths', () => {
  describe('#mobilizations', () => {
    it('should return the path', () => {
      expect(Paths.mobilizations()).to.equal('/mobilizations')
    })
  })

  describe('#mobilization', () => {
    it('should return the path', () => {
      expect(Paths.mobilization(1)).to.equal('/mobilizations/1')
    })
  })

  describe('#newMobilization', () => {
    it('should return the path', () => {
      expect(Paths.newMobilization()).to.equal('/mobilizations/new')
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
})
