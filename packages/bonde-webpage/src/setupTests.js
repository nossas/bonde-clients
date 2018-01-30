import chai from 'chai'
import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

// chai
global.jestExpect = global.expect
global.expect = chai.expect

// enzyme
configure({ adapter: new Adapter() })
