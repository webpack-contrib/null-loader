import {
  getCompiler,
  compile,
  getModuleSource,
  getExecutedCode,
} from './helpers/index';

describe('null-loader', () => {
  it('should works', async () => {
    const compiler = getCompiler('./fixture.js');
    const stats = await compile(compiler);

    expect(getModuleSource('./fixture.js', stats)).toMatchSnapshot('module');
    expect(getExecutedCode('main.bundle.js', compiler, stats)).toMatchSnapshot(
      'result'
    );
    expect(stats.compilation.warnings).toMatchSnapshot('warnings');
    expect(stats.compilation.errors).toMatchSnapshot('errors');
  });

  it('should works as inline loader', async () => {
    const compiler = getCompiler('./inline-loader.js');
    const stats = await compile(compiler);

    expect(getModuleSource('./inline-loader.js', stats)).toMatchSnapshot(
      'module'
    );
    expect(getExecutedCode('main.bundle.js', compiler, stats)).toMatchSnapshot(
      'result'
    );
    expect(stats.compilation.warnings).toMatchSnapshot('warnings');
    expect(stats.compilation.errors).toMatchSnapshot('errors');
  });

  it('should works with not js modules', async () => {
    const compiler = getCompiler('./fixture2.js');
    const stats = await compile(compiler);

    expect(getModuleSource('./fixture2.js', stats)).toMatchSnapshot('module');
    expect(getExecutedCode('main.bundle.js', compiler, stats)).toMatchSnapshot(
      'result'
    );
    expect(stats.compilation.warnings).toMatchSnapshot('warnings');
    expect(stats.compilation.errors).toMatchSnapshot('errors');
  });
});
