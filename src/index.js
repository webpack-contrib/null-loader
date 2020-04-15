import loaderUtils from 'loader-utils';
import validateOptions from 'schema-utils';

import schema from './options.json';

export default function () {
  return '';
}

export function pitch() {
  const options = loaderUtils.getOptions(this);

  validateOptions(schema, options, 'Null Loader');

  return '';
}
