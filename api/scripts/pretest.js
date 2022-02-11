/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
require('dotenv/config');
const { execSync } = require('child_process');

console.log('PRETEST!');

process.env.DATABASE_URL = `${process.env.DATABASE_URL}_testdb`;

console.log(`runnig migrations, database ${process.env.DATABASE_URL}`);
execSync('npm run db:migrate');
