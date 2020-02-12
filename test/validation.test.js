import webpack from './helpers/compiler';

describe('validation', () => {
  it('without options', async () => {
    const config = {
      loader: {
        test: /\.js$/,
      },
    };

    const stats = await webpack('fixture.js', config);
    const { warnings, errors } = stats.toJson();

    expect(warnings).toMatchSnapshot('warnings');
    expect(errors).toMatchSnapshot('errors');
  });

  it('with empty options', async () => {
    const config = {
      loader: {
        test: /\.js$/,
        options: {},
      },
    };

    const stats = await webpack('fixture.js', config);
    const { warnings, errors } = stats.toJson();

    expect(warnings).toMatchSnapshot('warnings');
    expect(errors).toMatchSnapshot('errors');
  });

  it('with unknown options', async () => {
    const config = {
      loader: {
        test: /\.js$/,
        options: { unknown: 'foo-bar' },
      },
    };

    const stats = await webpack('fixture.js', config);
    const { warnings, errors } = stats.toJson();

    expect(warnings).toMatchSnapshot('warnings');
    expect(errors).toHaveLength(1);
  });

  it('with comment options', async () => {
    const config = {
      loader: {
        test: /\.js$/,
        options: { comment: 'null-loader test suite' },
      },
    };

    const stats = await webpack('fixture.js', config);
    const { warnings, errors } = stats.toJson();
    expect(warnings).toMatchSnapshot('warnings');
    expect(errors).toMatchSnapshot('errors');
  });
});
