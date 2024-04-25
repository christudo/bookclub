module.exports = {
    "cookieSecret": process.env.COOKIESECRET || "MysuperSecretCookieSecret",
    "postgres": {
      "connectionString": process.env.DBCONNECTIONSTRING || 
      "postgresql://postgres:P@ssw0rd@localhost:5432/ircbooklist"
    }
   }