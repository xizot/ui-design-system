module.exports = function withXizotPostCSS(config) {
  if (typeof config === 'function') return (...args) => withXizotPostCSS(config(...args));
  if (config && typeof config.then === 'function') return config.then(withXizotPostCSS);
  const plugins = config.plugins || {};
  if (Array.isArray(plugins)) {
    const existing = plugins.some(
      (plugin) =>
        plugin?.postcssPlugin === '@tailwindcss/postcss' || plugin?.name === 'tailwindcss',
    );
    return {
      ...config,
      plugins: existing ? plugins : [require('@tailwindcss/postcss')(), ...plugins],
    };
  }
  return { ...config, plugins: { '@tailwindcss/postcss': {}, ...plugins } };
};
