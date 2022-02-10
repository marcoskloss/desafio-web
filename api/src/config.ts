import dotenv from 'dotenv';
import path from 'path';
import moduleAlias from 'module-alias';

const getPath = (): string => {
  const env = process.env.NODE_ENV;

  if (env === 'test') return '.env.test';
  return '.env.development';
};

dotenv.config({ path: getPath() });

const files = path.resolve(__dirname, '../../');

moduleAlias.addAliases({
  '@src': path.join(files, 'src'),
});
