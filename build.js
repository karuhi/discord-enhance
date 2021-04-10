require('dotenv').config();
const config = require('./config');

const define = {
  'process.env.NODE_ENV': '"development"',
};

const configClient = config.client();
for (const k in configClient) {
  define[k] = `"${configClient[k]}"`;
}

let settings = {
  entryPoints: ['public/js/main.js', 'public/js/success.js'],
  bundle: true,
  outdir: 'public/js/dist',
  define: define,
  minify: true,
};

if (process.env.WATCH_MODE === 'true') {
  settings['watch'] = {
    onRebuild(error, result) {
      if (error) {
        console.error('watch build failed:', error);
      } else {
        console.log('watch build succeeded:', result);
      }
    },
  };
}

require('esbuild')
  .build(settings)
  .catch(() => process.exit(1));
