import React from 'react/addons'
import { BlockMiniature } from './../../components'

const { TestUtils } = React.addons

const onClick = () => { alert('miniature was clicked!') }

describe('BlockMiniature', () => {
  describe('#render', () => {
    [1, 2, 3, 4, 5].forEach((columns) => {
      it(`should render with ${columns} column, selected or unselected, bind onClick events`, () => {
        const component = TestUtils.renderIntoDocument(
          <BlockMiniature sizes={Array.apply(null, new Array(columns)).map(() => { return 4 })} selectedSizes={[4, 4, 4]} onClick={onClick.bind(component)} />
        )
        const container = TestUtils.scryRenderedDOMComponentsWithTag(component, 'div')[0]
        expect(container.props.onClick.toString()).to.equal(onClick.bind(component).toString())
        const columnsContainer = React.findDOMNode(component).childNodes[0]
        expect(columnsContainer.childNodes).to.have.length(columns)
        if(columns == 3) {
          expect(columnsContainer.getAttribute('class')).not.to.include('bg-white')
          expect(columnsContainer.getAttribute('class')).to.include('bg-silver')
        } else {
          expect(columnsContainer.getAttribute('class')).to.include('bg-white')
          expect(columnsContainer.getAttribute('class')).not.to.include('bg-silver')
        }
      })
    })
  })
})
