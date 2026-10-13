module.exports = function withXizotVite(config) {
  if (typeof config === 'function') return (...args) => withXizotVite(config(...args));
  if (config && typeof config.then === 'function') return config.then(withXizotVite);
  const previous = config.resolve?.alias || {};
  const aliases = Array.isArray(previous)
    ? previous
    : Object.entries(previous).map(([find, replacement]) => ({ find, replacement }));
  return {
    ...config,
    resolve: {
      ...config.resolve,
      alias: [
        {
          find: /^@\/design-system(?=\/|$)/,
          replacement: `${__dirname.replaceAll('\\', '/')}/../design-system`,
        },
        ...aliases,
      ],
    },
  };
};
