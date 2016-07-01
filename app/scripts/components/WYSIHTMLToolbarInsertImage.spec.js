import React from 'react'
import sinon from 'sinon'
import { expect } from 'chai'
import { shallow, mount } from 'enzyme'
import ReactS3Uploader from 'react-s3-uploader'
import WYSIHTMLToolbarInsertImage from './WYSIHTMLToolbarInsertImage.jsx'

process.env.API_URL = `foo-bar`

describe('WYSIHTMLToolbarInsertImage', () => {
  let wrapper
  let sandbox

  let state = {
    image: null,
    isLoading: false
  }

  before(() => {
    sandbox = sinon.sandbox.create()
  })

  afterEach(() => {
    sandbox.restore()
  })

  describe('#render', () => {
    before(() => {
      wrapper = mount(<WYSIHTMLToolbarInsertImage />)
    })

    context(`html`, () => {
      context(`data-wysihtml5-dialog`, () => {
        let node
        before(() => { node = wrapper.find(`div.bg-darken-3`) })

        it(`should render a <div> with attribute`, () => {
          expect(node.props()[`data-wysihtml5-dialog`]).to.be.not.null
        })
        it(`should have 'insertImage' value`, () => {
          expect(node.props()[`data-wysihtml5-dialog`]).to.equal(`insertImage`)
        })
      })

      context(`data-wysihtml5-dialog-field`, () => {
        let node
        before(() => { node = wrapper.find(`i.fa-spin + input`) })

        it(`should render a <div> with attribute`, () => {
          expect(node.props()[`data-wysihtml5-dialog-field`]).to.be.not.null
        })
        it(`should have 'src' value`, () => {
          expect(node.props()[`data-wysihtml5-dialog-field`]).to.equal(`src`)
        })
        it(`should have null value prop`, () => {
          expect(node.props().value).to.be.null
        })
      })

      context(`data-wysihtml5-dialog-action`, () => {
        let nodes
        before(() => { nodes = wrapper.find(`div.bg-darken-3 a`) })

        it(`should render 2 <a> with attribute`, () => {
          expect(nodes.length).to.equal(2)
        })

        context(`save`, () => {
          it(`should have 'save' value`, () => {
            expect(nodes.at(0).props()[`data-wysihtml5-dialog-action`]).to.equal(`save`)
          })
          it(`should have 'Inserir' children text`, () => {
            expect(nodes.at(0).text()).to.equal(`Inserir`)
          })
        })

        context(`cancel`, () => {
          it(`should have 'cancel' value`, () => {
            expect(nodes.at(1).props()[`data-wysihtml5-dialog-action`]).to.equal(`cancel`)
          })
          it(`should have 'Cancelar' children text`, () => {
            expect(nodes.at(1).text()).to.equal(`Cancelar`)
          })
        })
      })

      context(`ReactS3Uploader`, () => {
        let node
        let s3Uploader

        before(() => {
          node = wrapper.find(`.bg-darken-3 div.mr2`)
          s3Uploader = mount(
            <ReactS3Uploader
              signingUrl={`${process.env.API_URL}/uploads`}
              accept="image/*"
              onProgress={::WYSIHTMLToolbarInsertImage.prototype.handleUploadProgress}
              onError={::WYSIHTMLToolbarInsertImage.prototype.handleUploadError}
              onFinish={::WYSIHTMLToolbarInsertImage.prototype.handleUploadFinish} />
          )
        })

        it(`should render 1 <ReactS3Uploader> component`, () => {
          expect(node.html()).to.have.string(s3Uploader.html())
        })

        context(`signingUrl prop`, () => {
          it(`should not be null`, () => {
            expect(node.children().props().signingUrl).to.not.be.null
          })
          it(`signingUrl prop should be '${process.env.API_URL}/uploads'`, () => {
            expect(node.children().props().signingUrl).to.equal(`${process.env.API_URL}/uploads`)
          })
        })

        context(`accept prop`, () => {
          it(`should not be null`, () => {
            expect(node.children().props().accept).to.not.be.null
          })
          it(`accept prop should be '${process.env.API_URL}/uploads'`, () => {
            expect(node.children().props().accept).to.equal(`image/*`)
          })
        })

        context(`events`, () => {
          it(`onProgress should be a function`, () => {
            expect(node.children().props().onProgress).to.be.a.function
          })
          it(`onError should be a function`, () => {
            expect(node.children().props().onError).to.be.a.function
          })
          it(`onFinish should be a function`, () => {
            expect(node.children().props().onFinish).to.be.a.function
          })
        })
      })
    })

    context(`default`, () => {
      it(`should have expectd default state`, () => {
        let expectedState = {
          image: null,
          isLoading: false
        }
        expect(wrapper.state()).to.be.deep.equal(expectedState)
      })
    })
  })

  describe(`#handleUploadProgress`, () => {
    let node
    let spy = {}

    before(() => {
      node = wrapper.find(`.bg-darken-3 div.mr2 input`)
      spy.setState = sandbox.spy(WYSIHTMLToolbarInsertImage.prototype, `setState`)
    })

    it(`should call setState when simulates progress event trigger`, () => {
      node.simulate(`progress`)
      expect(spy.setState).to.have.been.calledOnce
    })
    it(`should call setState with true loading state`, () => {
      let expectedState = { isLoading: true }
      node.simulate(`progress`)
      expect(spy.setState).to.have.been.calledWith(expectedState)
    })
  })

  describe(`#handleUploadError`, () => {
    let node
    let spy = {}

    before(() => {
      node = wrapper.find(`.bg-darken-3 div.mr2 input`)
      spy.setState = sandbox.spy(WYSIHTMLToolbarInsertImage.prototype, `setState`)
    })

    it(`should call setState when simulates progress event trigger`, () => {
      node.simulate(`error`)
      expect(spy.setState).to.have.been.calledOnce
    })
    it(`should call setState with false loading state`, () => {
      let expectedState = { isLoading: false }
      node.simulate(`error`)
      expect(spy.setState).to.have.been.calledWith(expectedState)
    })
  })
})
