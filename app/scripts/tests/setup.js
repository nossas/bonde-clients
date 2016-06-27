var jsdom = require('jsdom').jsdom;
var exposedProperties = ['window', 'navigator', 'document'];

global.document = jsdom('');
global.window = document.defaultView;
Object.keys(document.defaultView).forEach((property) => {
  if (typeof global[property] === 'undefined') {
    exposedProperties.push(property);
    global[property] = document.defaultView[property];
  }
});

global.navigator = {
  userAgent: 'node.js'
};

////
// Ignore specified extension types.
////
const noop = () => null
require.extensions['.scss'] = noop
require.extensions['.png'] = noop

////
// Sinon-Chai
////
import chai from 'chai'
import sinonChai from 'sinon-chai'
chai.use(sinonChai)
