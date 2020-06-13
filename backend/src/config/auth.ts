export default {
  jwt: {
    secret: process.env.APP_SECRET || 'not-secure',
    expiresIn: '1d',
  },
};
