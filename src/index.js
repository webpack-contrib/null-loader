import { getOptions } from 'loader-utils';
import { validate } from 'schema-utils';

import schema from './options.json';

export default function loader() {
  return '';
}

export function pitch() {
  const options = getOptions(this);

  validate(schema, options, {
    name: 'Null Loader',
    baseDataPath: 'options',
  });

  return '';
}
