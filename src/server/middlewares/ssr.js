const isDebug = process.env.NODE_ENV !== 'production';

const cssModulesHook = require('css-modules-require-hook');

cssModulesHook({
  extensions: ['.css'],
  camelCase: 'dashes',
  generateScopedName: isDebug
    ? '[name]-[local]-[hash:base64:5]'
    : '[hash:base64:5]'
});

const React = require('react');
const { StaticRouter } = require('react-router');
const { renderToStaticMarkup, renderToString } = require('react-dom/server');

const Html = require('../../client/Html').default;

const Pages = require('../../client/pages').default;

const assets = require('../../../dist/assets.json');

class ServerSideRender {
  static render(req, res) {
    const createElement = React.createElement;
    const context = {};
    const data = {
      styles: [assets.client.css],
      scripts: [assets.vendor.js, assets.client.js],
      children: renderToString(
        createElement(
          StaticRouter,
          { location: req.originalUrl, context },
          createElement(Pages, {})
        )
      )
    };

    const html = renderToStaticMarkup(createElement(Html, data));

    res.send(`<!doctype html>${html}`);
  }
}

module.exports = ServerSideRender;
