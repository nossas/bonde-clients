var context = require.context('./app/scripts/tests', true, /Test\.(js|jsx)$/);
context.keys().forEach(context);
