require('dotenv').config();

module.exports = {
  'migrationDirectory': 'migrations',
  'driver': 'pg',
  'connectionString': (process.env.NODE_ENV === 'test')
    ? process.env.TEST_DB_URL
    : process.env.DB_URL,
  'ssl': false, 
  'host': 'localhost' ,
  'port': 5432,
  'database': 'morsel',
  'username': 'postgres', 
  'password': 'postgres',
};