const { Sequelize } = require("sequelize");

let sequelize;

// USE POSTGRES:
const {
  POSTGRES_USER: user,
  POSTGRES_PASSWORD: pass,
  POSTGRES_DB: dbname,
  POSTGRES_HOST: host,
  POSTGRES_PORT: port
} = process.env;

sequelize = new Sequelize(
  `postgres://${user}:${pass}@${host}:${port}/${dbname}`,
  {
    logging: false,
    define: {
      // Convert database column names to snake_case
      underscored: true
    }
  }
);
 
sequelize.authenticate()
  .then(() => console.log("Database connection established"))
  .catch(e => {
    console.log("Database connection failed:")
    console.log(e);
  });

module.exports = sequelize;