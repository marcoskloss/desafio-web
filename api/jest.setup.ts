import './src/config';
process.env.DATABASE_URL = `${process.env.DATABASE_URL}_testdb`;

module.exports = {};
