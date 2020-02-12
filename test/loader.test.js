import path from 'path';

import webpack from './helpers/compiler';

describe('null-loader', () => {
  it('should works', async () => {
    const config = {
      devtool: false,
      loader: {
        test: /\.js$/,
      },
    };

    const stats = await webpack('fixture.js', config);
    const { warnings, errors } = stats.toJson();

    expect(warnings).toMatchSnapshot('warnings');
    expect(errors).toMatchSnapshot('errors');

    expect(stats.compilation.assets['main.js'].source()).toMatchSnapshot();
  });

  it('should works as inline loader', async () => {
    const config = {
      pathinfo: false,
      devtool: false,
    };

    const stats = await webpack('inline-loader.js', config);
    const { warnings, errors } = stats.toJson();

    expect(warnings).toMatchSnapshot('warnings');
    expect(errors).toMatchSnapshot('errors');

    expect(stats.compilation.assets['main.js'].source()).toMatchSnapshot();
  });

  it('should works with not js modules', async () => {
    const config = {
      pathinfo: false,
      devtool: false,
      rules: [
        {
          test: /\.css$/,
          use: [
            'css-loader',
            {
              loader: path.resolve(__dirname, '../src'),
            },
          ],
        },
      ],
    };

    const stats = await webpack('fixture2.js', config);
    const { warnings, errors } = stats.toJson();

    expect(warnings).toMatchSnapshot('warnings');
    expect(errors).toMatchSnapshot('errors');

    expect(stats.compilation.assets['main.js'].source()).toMatchSnapshot();
  });

  it('should works with comments', async () => {
    const config = {
      pathinfo: false,
      devtool: false,
      loader: {
        test: /\.js$/,
        options: { comment: 'null-loader test suite' },
      },
    };

    const stats = await webpack('fixture.js', config);
    const { warnings, errors } = stats.toJson();

    expect(warnings).toMatchSnapshot('warnings');
    expect(errors).toMatchSnapshot('errors');

    expect(stats.compilation.assets['main.js'].source()).toMatchSnapshot();
  });
});
