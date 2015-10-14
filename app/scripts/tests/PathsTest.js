import * as Paths from './../Paths'

describe('Paths', () => {
  describe('#login', () => {
    it('should return the path', () => {
      expect(Paths.login()).to.equal('/login')
    })
  })

  describe('#logout', () => {
    it('should return the path', () => {
      expect(Paths.logout()).to.equal('/logout')
    })
  })

  describe('#mobilizations', () => {
    it('should return the path', () => {
      expect(Paths.mobilizations()).to.equal('/')
    })
  })

  describe('#mobilization', () => {
    it('should return the path', () => {
      expect(Paths.mobilization('meurio', 'reboo.org'))
        .to.equal('http://meurio.reboo.org')
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
