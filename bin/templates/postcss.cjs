module.exports = function withXizotPostCSS(config) {
  if (typeof config === 'function') return (...args) => withXizotPostCSS(config(...args));
  if (config && typeof config.then === 'function') return config.then(withXizotPostCSS);
  const plugins = config.plugins || {};
  if (Array.isArray(plugins)) {
    const existing = plugins.some(
      (plugin) =>
        plugin === '@tailwindcss/postcss' ||
        (Array.isArray(plugin) && plugin[0] === '@tailwindcss/postcss') ||
        plugin?.postcssPlugin === '@tailwindcss/postcss' ||
        plugin?.name === 'tailwindcss',
    );
    return {
      ...config,
      plugins: existing ? plugins : ['@tailwindcss/postcss', ...plugins],
    };
  }
  return { ...config, plugins: { '@tailwindcss/postcss': {}, ...plugins } };
};
