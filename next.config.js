module.exports = {
  reactStrictMode: true,
  env: {
    URL_SERVER: process.env.URL_SERVER,
    MONGODB_URI: process.env.MONGODB_URI,
    PASS_SEC:process.env.PASS_SEC,
    JWT_SEC:process.env.JWT_SEC,
    TOKEN:process.env.TOKEN
  }
}