module.exports = function withXizotCRA(config) {
  if (typeof config === 'function') return (...args) => withXizotCRA(config(...args));
  if (config && typeof config.then === 'function') return config.then(withXizotCRA);
  const configure = config.webpack?.configure;
  return {
    ...config,
    style: { ...config.style, postcss: { ...config.style?.postcss, mode: 'file' } },
    webpack: {
      ...config.webpack,
      configure(webpackConfig, context) {
        const result =
          typeof configure === 'function'
            ? configure(webpackConfig, context)
            : { ...webpackConfig, ...configure };
        for (const plugin of result.plugins || []) {
          if (plugin.constructor.name === 'ForkTsCheckerWebpackPlugin') {
            plugin.options.typescript = {
              ...plugin.options.typescript,
              typescriptPath: require.resolve('xizot-typescript'),
            };
          }
        }
        return result;
      },
    },
  };
};
