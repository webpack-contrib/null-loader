import { name as PROJECT_NAME } from '../package.json';
import NullLoader from '../src';

describe(PROJECT_NAME, () => {
  test('should export the loader', (done) => {
    expect(NullLoader).toBeInstanceOf(Function);
    done();
  });
});
