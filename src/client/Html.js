import React from 'react';

class Html extends React.Component {
  render() {
    const {
      children,
      scripts,
      styles
    } = this.props;
    return (
      <html className="no-js" lang="es">
        <head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
          <meta httpEquiv="x-ua-compatible" content="ie=edge" />
          <title>Qubitv</title>
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.0/normalize.min.css" />
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/meyer-reset/2.0/reset.min.css" />
          <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700,900" />
          <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
          {styles.map(style => <link key={style} rel="stylesheet" href={style} />)}
        </head>
        <body style={{ fontFamily: '"Roboto", sans-serif' }}>
          {/* <!-- The app hooks into this div --> */}
          <div id="app" dangerouslySetInnerHTML={{ __html: children }} />
          {/* <!-- Scripts tags --> */}
          {scripts.map(script => <script key={script} src={script} />)}
        </body>
      </html>
    );
  }
}

export default Html;
