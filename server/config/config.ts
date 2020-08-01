interface ConfigDefinition {
  serverHost: string,
  serverPort: string,
  databaseUrl: string
}

interface Configurations {
  production: ConfigDefinition,
  development: ConfigDefinition
}

const production: ConfigDefinition = {
  serverHost: 'https://my-recsys.herokuapp.com',
  serverPort: process.env.PORT,
  databaseUrl: 'mongodb+srv://recsys:tricky1@recsys.hxff5.mongodb.net/recsysdb1?retryWrites=true&w=majority'
};

const development : ConfigDefinition = {
  serverHost: 'localhost',
  serverPort: '4000',
  databaseUrl: 'mongodb+srv://recsys:tricky1@recsys.hxff5.mongodb.net/recsysdb1?retryWrites=true&w=majority'
};

const configs: Configurations = {
  production,
  development,
};

export = configs;
