var context = require.context('./app/scripts', true, /Test\.js$/);
context.keys().forEach(context);
