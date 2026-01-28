function fn() {
  var env = karate.env; // get system property 'karate.env'
  karate.log('karate.env system property was:', env);
  if (!env) {
    env = 'dev';
  }
  const currency = '#string'

  var config = {
    env: env,
    myVarName: 'someValue',
    tipos: {
      fare: {
        objects: '#object',
        currency,
      },
      basket: {
        currency,
        elements: '#array'
      }
    }
  }
  if (env == 'dev') {
    // customize
    // e.g. config.foo = 'bar';
  } else if (env == 'e2e') {
    // customize
  }
  return config;
}