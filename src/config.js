module.exports = {
  development: {
    isProduction: false,
    port: 3001,
    app: {
      name: 'React Redux Example Development'
    }
  },
  production: {
    isProduction: true,
    port: process.env.PORT,
    app: {
      name: 'React Redux Example Production'
    }
  }
}[process.env.NODE_ENV || 'development'];
