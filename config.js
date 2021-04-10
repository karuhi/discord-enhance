require('dotenv').config();

const env = {
  ENV_APP_PORT: process.env.PORT,
  ENV_OAUTH2_CLIENT_ID: process.env.CLIENT_ID,
  ENV_OAUTH2_CLIENT_SECRET: process.env.CLIENT_SECRET,
  ENV_OAUTH2_GRANT_TYPE: process.env.GRANT_TYPE,
  ENV_OAUTH2_REDIRECT_URI: process.env.REDIRECT_URI,
  ENV_OAUTH2_SCOPE: process.env.SCOPE,
  ENV_API_BASE_URL: process.env.API_BASE_URL,
  ENV_AVATAR_BASE_URL: process.env.AVATAR_BASE_URL,
};

const envClient = ['ENV_API_BASE_URL', 'ENV_AVATAR_BASE_URL'];

const envServer = ['ENV_API_BASE_URL', 'ENV_AVATAR_BASE_URL'];

const getEnvMap = (keys) => {
  let map = {};
  keys.forEach((e) => {
    map[e] = env[e];
  });
  return map;
};

exports.client = () => {
  return getEnvMap(envClient);
};

exports.server = () => {
  return getEnvMap(envServer);
};
