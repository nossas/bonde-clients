var context = require.context('./app/scripts/tests', true, /Test\.js$/);
context.keys().forEach(context);
