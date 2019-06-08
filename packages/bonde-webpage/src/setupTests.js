// setup file
import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

configure({ adapter: new Adapter() })

import {JSDOM} from 'jsdom'
const doc = new JSDOM('<!doctype html><html><body></body></html>')
global.window = doc.window
global.document = window.document